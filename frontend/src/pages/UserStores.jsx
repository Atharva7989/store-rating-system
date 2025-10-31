import React, { useEffect, useState } from "react";
import API from "../utils/api";
import "../styles/UserStores.css";

const UserStores = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await API.get("/stores", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStores(res.data.stores || res.data || []);
  } catch (error) {
    console.error(" Error fetching stores:", error);
    setStores([]); 
  }
};

const handleRating = async (storeId, rating) => {
  // Ask for confirmation before submitting
  const confirmSubmit = window.confirm("Are you sure you want to submit this rating?");
  if (!confirmSubmit) return; 
  try {
    const token = localStorage.getItem("token");
    const res = await API.post(
      "/rating/submit", 
      { storeId, rating },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert(res.data.message || "Rating submitted successfully!");
    setRatings({ ...ratings, [storeId]: rating });

    fetchStores();
  } catch (error) {
    console.error("Error submitting rating:", error);
    alert("Failed to submit rating. Please try again.");
  }
};


  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>All Stores</h2>

      <input
        type="text"
        placeholder="Search by store name or address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          width: "500px",
          marginBottom: "20px",
          display: "block",
          backgroundColor: "white",  
          color: "black",              
          border: "1.5px solid black", 
          borderRadius: "6px",         
          
        }}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ccc",
        }}
      >
        <thead style={{}}>
          <tr>
            <th style={thStyle}>Store Name</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Overall Rating</th>
            <th style={thStyle}>Your Rating</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.map((store) => (
            <tr key={store.id}>
              <td style={tdStyle}>{store.name}</td>
              <td style={tdStyle}>{store.address}</td>
              <td style={tdStyle}>{store.average_rating  || "N/A"}</td>
              <td style={tdStyle}>
                <select
                  value={ratings[store.id] || ""}
                  onChange={(e) => handleRating(store.id, e.target.value)}
                  style={{ padding: "5px" }}
                >
                  <option value="">Rate</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
};

export default UserStores;
