const Order = require("../model/Order");


// Customer places order
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      user: req.user.id, 
      restaurant: req.body.restaurant, 
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get customer orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("restaurant", "name")
      .populate("user", "name email");

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


