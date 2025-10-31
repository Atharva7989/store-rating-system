const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

router.use(authMiddleware(), isAdmin);

router.get("/dashboard", adminController.getDashboardData);
router.post("/user", adminController.addUser);
router.post("/store", adminController.addStore);
router.get("/users", adminController.getUsers);
router.get("/stores", adminController.getStores);
router.post("/logout", adminController.logout);


module.exports = router;
