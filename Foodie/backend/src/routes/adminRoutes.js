const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { getRestaurantOrders, updateOrderStatus } = require("../controllers/adminController");

const router = express.Router();

router.get("/orders", verifyToken, getRestaurantOrders);
router.put("/orders/:id", verifyToken, updateOrderStatus);

module.exports = router;
