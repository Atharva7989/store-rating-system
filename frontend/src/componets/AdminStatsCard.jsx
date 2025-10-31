import React from "react";

const AdminStatsCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-60 text-center">
      <h3 className="text-gray-500 font-semibold">{title}</h3>
      <p className="text-3xl font-bold text-indigo-600 mt-2">{value}</p>
    </div>
  );
};

export default AdminStatsCard;
