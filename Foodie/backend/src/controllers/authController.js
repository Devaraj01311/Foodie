const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// REGISTER
exports.register = async (req, res) => {
  try {
    const name = (req.body.name || "").trim();
    const email = (req.body.email || "").trim().toLowerCase();
    const password = (req.body.password || "").trim();
    const role = req.body.role;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const email = (req.body.email || "").trim().toLowerCase();
    const password = (req.body.password || "").trim();

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const payload = {
      id: user._id,
      role: user.role,
    };

    if (user.role === "restaurant" || user.role === "admin") {
      payload.restaurantId = user.restaurantId;
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        restaurantId: user.restaurantId || null,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGOUT
exports.logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: "Logout failed" });
  }
};

// FORGOT PASSWORD

exports.forgotPassword = async (req, res) => {
  // 1. Always use 'const' or 'let'
  const FRONT_URL = process.env.FRONT_URL; 
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2. Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // 3. Hash and save to database
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save({ validateBeforeSave: false });

    // 4. Create Reset URL (Check for typos here!)
    const resetUrl = `${FRONT_URL}/reset-password/${resetToken}`;

    // 5. Setup Transporter (Use Gmail App Password)
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // This must be the 16-character App Password
      },
    });

    // 6. Send Mail
    await transporter.sendMail({
      from: `"Foodie Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #333;">Password Reset</h2>
          <p>You requested a password reset. Click the button below to proceed:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #fbbf24; color: #000; text-decoration: none; font-weight: bold; border-radius: 8px;">
            Reset My Password
          </a>
          <p style="margin-top: 20px; color: #666; font-size: 12px;">This link will expire in 15 minutes.</p>
        </div>
      `,
    });

    res.json({ message: "Password reset link sent to email" });

  } catch (err) {
    console.error("EMAIL ERROR:", err); // This is where you saw the 't is not defined' error
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ error: "Invalid or expired token" });

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GUEST LOGIN (Handles both Customer and Restaurant)
exports.guestLogin = async (req, res) => {
  try {
    const role = req.body.role === "restaurant" ? "restaurant" : "customer";

    const guestId = crypto.randomBytes(4).toString("hex");
    const guestName = `Guest ${guestId}`;
    const guestEmail = `guest_${guestId}@foodie.com`;
    const guestPassword = crypto.randomBytes(16).toString("hex"); 

    const newUser = new User({
      name: guestName,
      email: guestEmail,
      password: guestPassword,
      role: role,
      isGuest: true
    });

    await newUser.save();

    // Generate JWT Payload
    const payload = {
      id: newUser._id,
      role: newUser.role,
    };

    if (role === "restaurant") {
      payload.restaurantId = null; 
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    //  Send Response
    res.status(201).json({
      message: `Logged in as Guest ${role}`,
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isGuest: true
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};