const express = require("express");
const { register, login , logout ,forgotPassword,resetPassword, guestLogin} = require("../controllers/authController");


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/guest-login", guestLogin);

module.exports = router;
