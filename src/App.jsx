import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import RoleRoute from "./components/RoleRoute";
import Home from "./pages/Home";
import PatientPage from "./pages/patient";
import DoctorPage from "./pages/doctor";
import AdminPage from "./pages/admin";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/patient"
            element={
              <RoleRoute role="patient">
                <PatientPage />
              </RoleRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <RoleRoute role="doctor">
                <DoctorPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <RoleRoute role="admin">
                <AdminPage />
              </RoleRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}