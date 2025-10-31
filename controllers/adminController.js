const { User, Store, Rating } = require("../models");
const bcrypt = require("bcryptjs");
const { Op, fn, col } = require("sequelize");

exports.getDashboardData = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.json({ totalUsers, totalStores, totalRatings });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, address, role });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.addStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;

    const store = await Store.create({
      name,
      email,
      address,
      owner_id: parseInt(owner_id),
    });

    res.json({ message: "Store added successfully", store });
  } catch (error) {
    console.error(" Error adding store:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getStores = async (req, res) => {
  try {
    const { name, email, address } = req.query;
    const filters = {};

    if (name) filters.name = { [Op.like]: `%${name}%` };
    if (email) filters.email = { [Op.like]: `%${email}%` };
    if (address) filters.address = { [Op.like]: `%${address}%` };

    const stores = await Store.findAll({
      where: filters,
      attributes: [
        "id",
        "name",
        "email",
        "address",
        "average_rating",
        "total_ratings"
      ],
      order: [["id", "ASC"]],
    });

    res.json(stores);
  } catch (error) {
    console.error(" Error fetching stores:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Users (with filters)
exports.getUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;
    const filters = {};

    if (name) filters.name = { [Op.like]: `%${name}%` };
    if (email) filters.email = { [Op.like]: `%${email}%` };
    if (address) filters.address = { [Op.like]: `%${address}%` };
    if (role) filters.role = role;

    const users = await User.findAll({ where: filters });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    let rating = null;
    if (user.role === "store_owner") {
      const store = await Store.findOne({ where: { owner_id: id } });
      if (store) {
        const avgRating = await Rating.findOne({
          attributes: [[fn("AVG", col("rating")), "avgRating"]],
          where: { store_id: store.id },
        });
        rating = avgRating?.dataValues.avgRating || 0;
      }
    }

    res.json({ user, rating });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details" });
  }
};
exports.updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address, owner_id } = req.body;

    const store = await Store.findByPk(id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    await store.update({ name, email, address, owner_id });
    res.json({ message: "Store updated successfully", store });
  } catch (error) {
    console.error(" Error updating store:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteStore = async (req, res) => {
  try {
    const { id } = req.params;

    const store = await Store.findByPk(id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    await store.destroy();
    res.json({ message: "Store deleted successfully" });
  } catch (error) {
    console.error(" Error deleting store:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.logout = (req, res) => {
  try {
    res.clearCookie("token"); 
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


