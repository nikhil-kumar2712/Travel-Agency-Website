import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // If no user found, redirect to sign-in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}