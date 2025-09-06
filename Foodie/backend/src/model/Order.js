const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  items: [
    {
      name: { 
            type: String, 
            required: true },
      price: { 
        type: Number, 
        required: true },
      quantity: { 
        type: Number, 
        required: true },
    },
  ],
  total: Number,
  status: {
    type: String,
    enum: ["pending", "preparing", "completed", "cancelled" , "delivered"],
    default: "pending",
  },

  payment: {
    method: {
      type: String,
      enum: ["cod", "upi", "card"],
      default: "cod",
    },
    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    otp: {
      type: String,
      select: false,
    },
    otpExpires: {
      type: Date,
    },
  },

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
