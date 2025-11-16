import React from "react";
import { useAuth } from "../auth/AuthContext";
export default function DoctorPage() {
  const { user } = useAuth();
  return <div style={{ padding: 24 }}>Doctor dashboard — welcome {user?.name}</div>;
}