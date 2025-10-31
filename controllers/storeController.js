exports.getAllStores = async (req, res) => {
  try {
    const { name, address } = req.query;
    const where = {};

    if (name) where.name = { [Op.like]: `%${name}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };

    const stores = await Store.findAll({ where });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const bcrypt = require("bcryptjs");
const { Rating, Store, User } = require("../models");
exports.getStoreRatings = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const store = await Store.findOne({
      where: { owner_id: ownerId },
      attributes: ["id", "name", "average_rating"],
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found for this owner" });
    }

    const ratings = await Rating.findAll({
      where: { store_id: store.id },
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["id", "DESC"]],
    });

    res.json({
      store,
      totalRatings: ratings.length,
      ratings: ratings.map((r) => ({
        id: r.id,
        rating: r.rating,
        user: r.User ? r.User.name : "Unknown User",
        email: r.User ? r.User.email : "N/A",
      })),
    });
  } catch (err) {
    console.error(" Error fetching store dashboard data:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getStoreDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const store = await Store.findOne({ where: { owner_id: ownerId } });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const ratings = await Rating.findAll({
      where: { store_id: store.id },
      include: [{ model: User, attributes: ["name", "email"] }],
    });

    const totalRatings = ratings.length;
    const average =
      totalRatings > 0
        ? (ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings).toFixed(2)
        : 0;

    store.average_rating = average;
    store.total_ratings = totalRatings;

    res.json({
      message: "Success",
      store,
      totalRatings,
      ratings: ratings.map((r) => ({
        id: r.id,
        rating: r.rating,
        user: r.User?.name || "Anonymous",
        email: r.User?.email || "N/A",
      })),
    });
  } catch (error) {
    console.error(" Error fetching store dashboard:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const ownerId = req.user.id; 
    const { currentPassword, newPassword } = req.body;

    const owner = await User.findByPk(ownerId);
    if (!owner) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, owner.password);
    if (!isMatch)
      return res.status(400).json({ message: "Old password is incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    owner.password = hashed;
    await owner.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(" Error updating password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(" Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};