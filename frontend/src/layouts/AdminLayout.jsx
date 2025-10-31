import React from "react";
import AdminSidebar from "../componets/AdminSidebar";
import "../styles/AdminLayout.css"; 

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">{children}</div>
    </div>
  );
};

export default AdminLayout;

