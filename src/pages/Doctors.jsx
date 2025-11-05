import React from "react";
import Layout from "../components/Layout";

function Doctors() {
  return (
    <Layout>
      <h2>Doctor Management</h2>
      <p>Manage doctor profiles, patient assignments, and prescriptions.</p>
      <button>View Schedule</button>
      <button>Manage Prescriptions</button>
    </Layout>
  );
}

export default Doctors;
