import React, { useEffect, useState } from "react";
import API from "../utils/api";

const ViewStores = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/admin/stores", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStores(res.data.stores);
      } catch (error) {
        console.error(" Error fetching stores:", error);
      }
    };
    fetchStores();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">All Stores</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Owner ID</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td className="border p-2">{store.id}</td>
              <td className="border p-2">{store.name}</td>
              <td className="border p-2">{store.email}</td>
              <td className="border p-2">{store.address}</td>
              <td className="border p-2">{store.owner_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStores;
