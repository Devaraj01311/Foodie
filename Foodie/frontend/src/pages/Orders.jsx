import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:6001/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
        case "cancelled":
          return "bg-red-100 text-red-800";
      case "delivered":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full mx-auto p-6 mt-1">
 <div className="relative">
        <img
          src="/image/order1.jpg"
          alt="Restaurant"
          className="w-full h-80 object-cover rounded-t-lg rounded-b-2xl"
        />
        <h2 className="absolute inset-0 text-orange-300 ml-7 flex items-center justify-start text-3xl font-bold mt-1  drop-shadow-lg">
        Your Order
        </h2>
        <h2 className="absolute inset-0  ml-7 flex items-center justify-start text-4xl font-bold mt-20 text-white drop-shadow-lg">on the way</h2>
        <h2 className="absolute left-0 bottom-0 bg-white/80 px-6 py-3 text-3xl font-bold text-gray-500 mb-0 rounded-b-2xl w-full text-left">
          My Orders
        </h2>
      </div>
    
      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You have no orders yet.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-50 rounded-xl p-5 flex flex-col mt-4 gap-3"
            >
              <div className="flex justify-between items-center">
                <p className="font-medium text-gray-800">Order #{order._id}</p>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.toUpperCase()}
                </span>
              </div>

              <p className="text-gray-700 font-medium">Total: ₹{order.total}</p>

              <ul className="divide-y divide-gray-200">
                {order.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between py-2 text-gray-800 text-sm"
                  >
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
