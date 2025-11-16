import React from "react";
import { useAuth } from "../auth/AuthContext";
export default function PatientPage() {
  const { user } = useAuth();
  return <div style={{ padding: 24 }}>Patient dashboard — welcome {user?.name}</div>;
}