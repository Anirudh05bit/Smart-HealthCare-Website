import React from "react";
import Layout from "../components/Layout";

function Patients() {
  return (
    <Layout>
      <h2>Patient Management</h2>
      <p>Register new patients, view profiles, and access medical records securely.</p>
      <button>Register Patient</button>
      <button>View Records</button>
    </Layout>
  );
}

export default Patients;
