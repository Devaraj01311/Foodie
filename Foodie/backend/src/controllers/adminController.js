const Order = require("../model/Order");
const Restaurant = require("../model/Restaurant");
const nodemailer = require("nodemailer");

// transporter
const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.getRestaurantOrders = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user.id });
    if (!restaurant) {
      return res
        .status(400)
        .json({ message: "No restaurant found for this user" });
    }

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("user", "name email")
      .populate("restaurant", "name");

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const restaurant = await Restaurant.findOne({ owner: req.user.id });
    if (!restaurant) {
      return res.status(403).json({ message: "Not authorized" });
    }
    if (order.restaurant.toString() !== restaurant._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // update status
    order.status = status;
    await order.save();


    const updatedOrder = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("restaurant", "name");

    // Send email to customer
    if (updatedOrder.user?.email) {
      const itemsHtml = updatedOrder.items
        .map(
          (item) => `
          <li>${item.name} - ${item.quantity} × ₹${item.price} = ₹${
            item.quantity * item.price
          }</li>`
        )
        .join("");

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: updatedOrder.user.email,
        subject: `Order Update - ${updatedOrder.restaurant?.name}`,
        html: `
          <h2>Hello ${updatedOrder.user.name || "Customer"},</h2>
          <p>Your order <strong>#${updatedOrder._id}</strong> from 
          <strong>${updatedOrder.restaurant?.name}</strong> has been updated.</p>
          <p><b>New Status:</b> ${updatedOrder.status.toUpperCase()}</p>

          <h3>Order Details:</h3>
          <ul>
            ${itemsHtml}
          </ul>
          <p><b>Total Amount:</b> ₹${updatedOrder.total}</p>
          <hr/>
          <p>Thank you for ordering with <b>${updatedOrder.restaurant?.name}</b>!</p>
          <small>This is an automated message, please do not reply.</small>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent to:", updatedOrder.user.email);
      } catch (error) {
        console.error(" Error sending email:", error);
      }
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
