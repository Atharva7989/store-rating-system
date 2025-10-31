const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth"); // middleware to verify JWT

router.put("/update-password", authMiddleware(), userController.updatePassword);

router.post("/logout", authMiddleware, userController.logout);

router.get("/stores", authMiddleware, userController.getAllStores);

module.exports = router;
