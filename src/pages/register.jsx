import React, { useState } from 'react';
import Layout from '../components/Layout';
import './register.css';

export default function Register() {
	const [role, setRole] = useState('patient');
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		dob: '',
		address: '',
		emergency: '',
		license: '',
		specialization: '',
		hospital: '',
	});

	function update(field) {
		return (e) => setForm((s) => ({ ...s, [field]: e.target.value }));
	}

	function handleSubmit(e) {
		e.preventDefault();
		// Client-side simple validation
		if (!form.name || !form.email || !form.password) {
			alert('Please fill name, email and password');
			return;
		}

		if (role === 'doctor' && (!form.license || !form.specialization)) {
			alert('Please provide doctor license and specialization');
			return;
		}

		// Placeholder: replace with API call
		console.log('register', { role, ...form });
		alert(`Registered as ${role}: ${form.name}`);
	}

	return (
		<Layout>
			<div className="register-page">
				<div className="register-card">
					<h2>Create account</h2>
					<p className="muted">Select your role and enter required details</p>

					<div className="role-toggle">
						<button
							type="button"
							className={role === 'patient' ? 'role active' : 'role'}
							onClick={() => setRole('patient')}
						>Patient</button>
						<button
							type="button"
							className={role === 'doctor' ? 'role active' : 'role'}
							onClick={() => setRole('doctor')}
						>Doctor</button>
					</div>

					<form className="register-form" onSubmit={handleSubmit}>
						<label className="label">Full name</label>
						<input className="input" value={form.name} onChange={update('name')} required />

						<label className="label">Email</label>
						<input className="input" type="email" value={form.email} onChange={update('email')} required />

						<label className="label">Password</label>
						<input className="input" type="password" value={form.password} onChange={update('password')} required />

						{role === 'patient' && (
							<>
								<label className="label">Date of birth</label>
								<input className="input" type="date" value={form.dob} onChange={update('dob')} />

								<label className="label">Address</label>
								<input className="input" value={form.address} onChange={update('address')} />

								<label className="label">Emergency contact</label>
								<input className="input" value={form.emergency} onChange={update('emergency')} />
							</>
						)}

						{role === 'doctor' && (
							<>
								<label className="label">Medical license number</label>
								<input className="input" value={form.license} onChange={update('license')} />

								<label className="label">Specialization</label>
								<input className="input" value={form.specialization} onChange={update('specialization')} />

								<label className="label">Hospital / Clinic</label>
								<input className="input" value={form.hospital} onChange={update('hospital')} />
							</>
						)}

						<button className="btn btn-primary full" type="submit">Create account</button>
					</form>
				</div>
			</div>
		</Layout>
	);
}
