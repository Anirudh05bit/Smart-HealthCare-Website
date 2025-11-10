const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/smart_healthcare'
});

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// Create users table (run on server start if not exists) - simple schema
async function ensureTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      dob DATE,
      address TEXT,
      emergency TEXT,
      license TEXT,
      specialization TEXT,
      hospital TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
}

ensureTables().catch((err) => console.error('Error creating tables', err));

// Register
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) return res.status(400).json({ error: 'Missing fields' });

    const hashed = await bcrypt.hash(password, 10);

    const fields = ['name', 'email', 'password', 'role', 'dob', 'address', 'emergency', 'license', 'specialization', 'hospital'];
    const values = fields.map((f) => req.body[f] || null);

    const q = `INSERT INTO users(${fields.join(',')}) VALUES(${fields.map((_,i)=>'$'+(i+1)).join(',')}) RETURNING id, name, email, role`;
    const result = await pool.query(q, values);

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ user, token });
  } catch (err) {
    console.error(err);
    if (err.code === '23505') return res.status(400).json({ error: 'Email already registered' });
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

    const q = 'SELECT id, name, email, password, role FROM users WHERE email=$1 LIMIT 1';
    const r = await pool.query(q, [email]);
    if (r.rowCount === 0) return res.status(400).json({ error: 'Invalid credentials' });

    const user = r.rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Simple protected route example
app.get('/api/me', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Unauthorized' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const r = await pool.query('SELECT id, name, email, role FROM users WHERE id=$1', [payload.id]);
    res.json({ user: r.rows[0] });
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server listening on', PORT));
