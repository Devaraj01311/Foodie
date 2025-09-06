const express = require("express");
const { createOrder, getOrders } = require("../controllers/orderController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);

module.exports = router;
