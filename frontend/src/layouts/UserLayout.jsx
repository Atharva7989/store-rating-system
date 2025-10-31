import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/UserLayout.css";
import UserSidebar from "../componets/UserSidebar";


const UserLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <UserSidebar />
      <main style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
        {children}
      </main>
    </div>
  );
};

export default UserLayout;
