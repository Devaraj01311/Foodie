const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const testMail = require("./controllers/testMail");

const authRoutes = require("./routes/authRouter");
const orderRoutes = require("./routes/orderRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const userRoutes = require("./routes/userRouter");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", testMail);
app.use("/api/contact", contactRoutes); 

module.exports = app;