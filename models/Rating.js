const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define("Rating", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
  });

  return Rating;
};
