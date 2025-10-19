
// ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const isAuth = !!localStorage.getItem("token"); // check token

  // Agar auth nahi hai to login par bhej do
  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRoute;
