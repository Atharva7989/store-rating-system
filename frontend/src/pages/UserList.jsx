import React, { useEffect, useState } from "react";
import API from "../utils/api";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
        setFilteredUsers(res.data);
      } catch (err) {
        console.error(" Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(value) ||
        u.email.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>

      <input
        type="text"
        placeholder="Search by user name or email"
        value={search}
        onChange={handleSearch}
        style={{
          padding: "8px",
          width: "650px",
          marginBottom: "20px",
          display: "block",
          backgroundColor: "white",
          color: "black",
          border: "1px solid black",
          borderRadius: "4px",
        }}
      />

      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-md shadow-md">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="border-t text-sm">
                <td className="border p-2">{u.id}</td>
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2 capitalize">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
