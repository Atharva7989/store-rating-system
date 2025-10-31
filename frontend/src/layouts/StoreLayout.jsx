import React from "react";
import StoreSidebar from "../componets/StoreSidebar";
import "../styles/AdminLayout.css";

const StoreLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <StoreSidebar />
      <div className="admin-content">{children}</div>
    </div>
  );
};

export default StoreLayout;
