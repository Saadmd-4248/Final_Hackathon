
//admin route
import React from "react";
import { Navigate, Outlet } from "react-router-dom";


const AdminGurad: React.FC = () => {
  const isAdmin = localStorage.getItem("role"); // check token

  // Agar auth nahi hai to login par bhej do
  return isAdmin ==="admin"?<Outlet/> : <Navigate to={'/admin'} />;
};

export default AdminGurad;
