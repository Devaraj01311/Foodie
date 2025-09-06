const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { getMe } = require("../controllers/userController");

const router = express.Router();


router.get("/me", verifyToken, getMe);

module.exports = router;
