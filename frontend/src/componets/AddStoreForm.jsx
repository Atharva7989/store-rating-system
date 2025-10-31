import React, { useState } from "react";
import { addStore } from "../api/adminApi";

export default function AddStoreForm() {
  const [form, setForm] = useState({ name: "", email: "", address: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStore(form);
      alert("Store added successfully!");
      setForm({ name: "", email: "", address: "" });
    } catch (error) {
      alert("Failed to add store!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mt-5 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-3">Add Store</h3>
      {["name", "email", "address"].map((field) => (
        <input
          key={field}
          type="text"
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="border p-2 mb-3 w-full rounded"
          value={form[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          required
        />
      ))}
      <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
        Add Store
      </button>
    </form>
  );
}
