import React, { useEffect, useState } from "react";
import { getDashboard } from "../api/adminApi";

export default function DashboardStats() {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getDashboard();
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 mt-5">
      <div className="p-4 bg-blue-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Total Users</h3>
        <p className="text-2xl font-bold">{stats.totalUsers}</p>
      </div>
      <div className="p-4 bg-green-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Total Stores</h3>
        <p className="text-2xl font-bold">{stats.totalStores}</p>
      </div>
      <div className="p-4 bg-yellow-100 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Total Ratings</h3>
        <p className="text-2xl font-bold">{stats.totalRatings}</p>
      </div>
    </div>
  );
}
