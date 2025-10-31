const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        len: [20, 60],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: DataTypes.STRING(400),
      allowNull: false,
      validate: {
        len: [1, 400],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user", "owner"),
      allowNull: false,
      defaultValue: "user",
    },
  });

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  return User;
};
