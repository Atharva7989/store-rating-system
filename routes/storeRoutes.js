const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware(), storeController.getAllStores);
router.get("/owner/dashboard",authMiddleware(["owner"]),storeController.getStoreDashboard);
router.put("/owner/password", authMiddleware(),storeController.updatePassword);
router.post("/owner/logout", storeController.logout);

module.exports = router;
