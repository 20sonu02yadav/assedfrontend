import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>;
  if (!user) return <Navigate to="/my-account" replace />;
  return <>{children}</>;
}