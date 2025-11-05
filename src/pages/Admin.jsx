import React from "react";
import Layout from "../components/Layout";

function Admin() {
  return (
    <Layout>
      <h2>Administrator Dashboard</h2>
      <p>Oversee appointments, manage users, and monitor system activity.</p>
      <button>View Reports</button>
      <button>Manage Users</button>
    </Layout>
  );
}

export default Admin;
