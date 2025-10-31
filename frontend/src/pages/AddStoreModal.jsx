import React, { useState, useEffect } from "react";
import "../styles/FilterModal.css"; 

const AddStoreModal = ({ onAdd, onClose, existingData }) => {
  const [store, setStore] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });

  useEffect(() => {
    if (existingData) {
      setStore(existingData);
    }
  }, [existingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore({ ...store, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!store.name || !store.email || !store.address || !store.owner_id) {
      alert(" Please fill all fields!");
      return;
    }

    onAdd(store); 
    setStore({ name: "", email: "", address: "", owner_id: "" });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3 className="modal-title">
          {existingData ? " Edit Store" : " Add New Store"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="modal-fields">
            <label>
              Store Name:
              <input
                type="text"
                name="name"
                value={store.name}
                onChange={handleChange}
                placeholder="Enter store name"
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                name="email"
                value={store.email}
                onChange={handleChange}
                placeholder="Enter store email"
              />
            </label>

            <label>
              Address:
              <input
                type="text"
                name="address"
                value={store.address}
                onChange={handleChange}
                placeholder="Enter address"
              />
            </label>

            <label>
              Owner ID:
              <input
                type="number"
                name="owner_id"
                value={store.owner_id}
                onChange={handleChange}
                placeholder="Enter owner ID"
              />
            </label>
          </div>

          <div className="modal-actions">
            <button type="submit" className="apply-btn">
              {existingData ? "Update Store" : "Add Store"}
            </button>
            <button type="button" className="close-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStoreModal;
