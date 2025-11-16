import React from "react";
import { useAuth } from "../auth/AuthContext";
export default function AdminPage() {
  const { user } = useAuth();
  return <div style={{ padding: 24 }}>Admin dashboard — welcome {user?.name}</div>;
}