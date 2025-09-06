const express = require("express");
const { register, login , logout ,forgotPassword,resetPassword} = require("../controllers/authController");
const { route } = require("./userRouter");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
