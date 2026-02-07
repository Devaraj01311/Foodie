const axios = require("axios");

const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Foodie Support", email: "devarajldev01@gmail.com" },
        to: [{ email: to }],
        subject: subject,
        htmlContent: html, 
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY, 
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Brevo Error:", err.response?.data || err.message);
    throw new Error("Email delivery failed");
  }
};

module.exports = sendEmail;