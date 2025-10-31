import React, { useEffect, useState } from "react";
import API from "../utils/api";

const StoreDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/stores/owner/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboardData(res.data);
      } catch (err) {
        console.error(" Error fetching dashboard data:", err);
        setError("Unable to fetch store dashboard data");
      }
    };

    fetchDashboardData();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!dashboardData) return <p>Loading dashboard...</p>;

  const { store, totalRatings, ratings } = dashboardData;

  return (
    <div className="dashboard-container" style={{ padding: "20px" }}>
      <h2>{store.name} Dashboard</h2>
      <p>
        <strong>Average Rating:</strong> {store.average_rating || 0}
      </p>
      <p>
        <strong>Total Ratings:</strong> {totalRatings}
      </p>

      <h3 style={{ marginTop: "20px" }}>User Feedback</h3>

      {ratings.length === 0 ? (
        <p>No ratings yet for this store.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#4A90E2", color: "#fff" }}>
              <th style={cellStyle}>#</th>
              <th style={cellStyle}>User Name</th>
              <th style={cellStyle}>Email</th>
              <th style={cellStyle}>Rating</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((r, index) => (
              <tr key={r.id} style={{ textAlign: "center" }}>
                <td style={cellStyle}>{index + 1}</td>
                <td style={cellStyle}>{r.user}</td>
                <td style={cellStyle}>{r.email}</td>
                <td style={cellStyle}>{r.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const cellStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  fontSize: "15px",
};

export default StoreDashboard;
