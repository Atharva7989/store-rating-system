import React, { useState, useEffect } from "react";
import API from "../utils/api";
import AddStoreModal from "./AddStoreModal";
import "../styles/TableStyles.css";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [editStore, setEditStore] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/admin/stores", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStores(res.data);
    } catch (err) {
      console.error(" Failed to fetch stores:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStore = async (storeData) => {
    try {
      const token = localStorage.getItem("token");
      await API.post("/admin/store", storeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(" Store added successfully!");
      setShowAddModal(false);
      fetchStores();
    } catch (error) {
      console.error(" Error adding store:", error);
    }
  };

  const handleUpdateStore = async (updatedData) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(`/admin/store/${editStore.id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(" Store updated successfully!");
      setEditStore(null);
      fetchStores();
    } catch (error) {
      console.error("Error updating store:", error);
    }
  };

  const handleDeleteStore = async (id) => {
    if (!window.confirm("Are you sure you want to delete this store?")) return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/admin/store/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(" Store deleted successfully!");
      fetchStores();
    } catch (error) {
      console.error(" Error deleting store:", error);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...stores].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setStores(sorted);
  };

  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return "";
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-center mt-10 text-lg text-gray-600">Loading stores...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 md:px-12">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <div className="flex justify-between items-center mb-8 border-b pb-3">
          <h2 className="text-3xl font-bold text-gray-800">🏬 Store Management</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="add-store-btn"
          >
            Add Store
          </button>
          <br />
          <br />
        </div>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by store name or address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "8px",
              width: "800px",
              marginBottom: "20px",
              display: "block",
              border: "1px solid black",
              borderRadius: "6px",
              backgroundColor: "white",
              color: "black",
              height:"40px",
            }}
          />
        </div>

        {filteredStores.length === 0 ? (
          <p className="text-center text-gray-600 mt-6">No stores found.</p>
        ) : (
          <div className="overflow-x-auto flex justify-center">
            <table className="w-5/6 border-collapse rounded-lg shadow-md overflow-hidden">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border p-3 cursor-pointer" onClick={() => handleSort("name")}>
                    Name {getSortArrow("name")}
                  </th>
                  <th className="border p-3 cursor-pointer" onClick={() => handleSort("email")}>
                    Email {getSortArrow("email")}
                  </th>
                  <th className="border p-3 cursor-pointer" onClick={() => handleSort("address")}>
                    Address {getSortArrow("address")}
                  </th>
                  <th className="border p-3 cursor-pointer" onClick={() => handleSort("average_rating")}>
                    Rating {getSortArrow("average_rating")}
                  </th>
                  <th className="border p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStores.map((store) => (
                  <tr key={store.id} className="bg-gray-50 hover:bg-blue-50 transition">
                    <td className="border p-3">{store.name}</td>
                    <td className="border p-3">{store.email}</td>
                    <td className="border p-3">{store.address}</td>
                    <td className="border p-3 text-center">{store.average_rating}</td>
                    <td className="border p-3 text-center space-x-2">
                      <button
                        onClick={() => setEditStore(store)}
                        className="blue-btn-table"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteStore(store.id)}
                        className="blue-btn-table "
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showAddModal && (
          <AddStoreModal onAdd={handleAddStore} onClose={() => setShowAddModal(false)} />
        )}

        {editStore && (
          <AddStoreModal
            existingData={editStore}
            onAdd={handleUpdateStore}
            onClose={() => setEditStore(null)}
          />
        )}
      </div>
    </div>
  );
};

export default StoreList;
