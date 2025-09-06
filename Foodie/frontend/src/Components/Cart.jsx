import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart,updateQuantity  } = useCart();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [msgType, setMsgType] = useState("success");

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMsgType("error");
      setMessage("Please login first!");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:6001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          restaurant: cart.length > 0 ? cart[0].restaurantId : null,
          items: cart.map((i) => ({
            name: i.name,
            price: i.price,
            quantity: i.qty,
          })),
          total: cart.reduce((sum, i) => sum + i.price * i.qty, 0),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        clearCart();
        setMsgType("success");
        setMessage("Order placed successfully!");
        setTimeout(() => navigate("/orders"), 1500);
      } else {
        setMsgType("error");
        setMessage("No " + data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setMsgType("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full mx-auto p-6 mt-2 bg-white rounded-xl shadow-sm">
      <div className="relative">
        <img
          src="/image/orderimage.jpg"
          alt="Restaurant"
          className="w-full h-80 object-cover rounded-t-lg rounded-b-2xl"
        />
        <h2 className="absolute inset-0 text-orange-300 ml-7 flex items-center justify-start text-3xl font-bold mt-1 drop-shadow-lg">
          Hungry Already?
        </h2>
        <h2 className="absolute inset-0 ml-7 flex items-center justify-start text-4xl font-bold mt-20 text-white drop-shadow-lg">
          Let’s Place the Order
        </h2>
        <h2 className="absolute left-0 bottom-0 bg-white/80 px-6 py-3 text-3xl font-bold text-gray-500 mb-0 rounded-b-2xl w-full text-left">
          🛒 Cart
        </h2>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <button
            onClick={() => navigate("/restaurants")}
            className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Browse Restaurants
          </button>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 mt-3">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center py-4">
                <div className="flex items-center gap-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg shadow-sm transform transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.name} <span className="text-gray-500">× {item.qty}</span>
                    </p>
                    <p className="text-sm text-gray-500">₹{item.price} each</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2">
                   <button
                   onClick={() => updateQuantity(item.name, item.qty - 1)}
                   className="px-2 py-1 bg-orange-300 rounded hover:bg-orange-400"
                    >
                    -
                  </button>
  
                   <span className="px-2">{item.qty}</span>
  
                  <button
                   onClick={() => updateQuantity(item.name, item.qty + 1)}
                   className="px-2 py-1 bg-orange-300 rounded hover:bg-orange-400"
                     >
                    +
                  </button>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    ₹{item.price * item.qty}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="text-red-500 hover:text-red-700 text-lg font-bold"
                  >
                    ✕
                  </button>

                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <h3 className="text-xl font-bold text-gray-900">Total</h3>
            <p className="text-2xl font-extrabold text-orange-600">
              ₹{cart.reduce((sum, i) => sum + i.price * i.qty, 0)}
            </p>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-orange-300 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition"
          >
            Place Order
          </button>

          {message && (
            <p
              className={`mt-4 text-center font-medium ${
                msgType === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
