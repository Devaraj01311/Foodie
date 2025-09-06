const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const User = require("../model/user");

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // generate reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    // send email here
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset. Click the button below:</p>
        <a href="${resetUrl}" style="display:inline-block;padding:10px 20px;
        background:#ef4444;color:#fff;text-decoration:none;border-radius:5px">
          Reset Password
        </a>
        <p>If you didn’t request this, you can ignore this email.</p>
      `,
    });

    res.json({ message: "Password reset link sent to your email" });
  } catch (err) {
    console.error("ForgotPassword Error:", err.message);
    res.status(500).json({ error: "Something went wrong. Try again!" });
  }
};
