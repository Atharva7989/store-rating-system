import React, { useEffect, useState } from "react";
import API from "../utils/api";
import AdminStatsCard from "../componets/AdminStatsCard";
import "../styles/AdminDashboard.css"; //

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await API.get("/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(data);
      } catch (err) {
        console.error(" Failed to fetch dashboard:", err);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="stats-grid">
        <AdminStatsCard title="Total Users" value={stats.totalUsers} />
        <AdminStatsCard title="Total Stores" value={stats.totalStores} />
        <AdminStatsCard title="Total Ratings" value={stats.totalRatings} />
      </div>
    </div>
  );
};

export default AdminDashboard;
