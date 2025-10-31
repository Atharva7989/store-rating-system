import React, { useState } from "react";
import API from "../utils/api";
import "../styles/UpdatePassword.css";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

const handleUpdate = async (e) => {
  e.preventDefault();
  if (newPassword !== confirmPassword) {
    setMessage("New password and confirm password do not match!");
    setIsError(true);
    return;
  }

    try {
      const res = await API.put("/user/update-password", {
        currentPassword,
        newPassword,
      });

      setMessage(res.data.message || "Password updated successfully!");
      setIsError(false);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(" Error updating password:", err);
      setMessage(err.response?.data?.message || "Failed to update password.");
      setIsError(true);
    }
  };

  return (
    <div className="update-password-container">
      <h2>Update Password</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Update</button>
      </form>

      {message && (
        <p className={isError ? "error" : "success"}>{message}</p>
      )}
    </div>
  );
};

export default UpdatePassword;
