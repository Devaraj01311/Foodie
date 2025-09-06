
const express = require("express");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

router.get("/test-email", async (req, res) => {
  try {
    await sendEmail("your-other-email@example.com", "Test Mail", "Hello from Nodemailer!");
    res.send("Test email sent");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send email");
  }
});

module.exports = router;
