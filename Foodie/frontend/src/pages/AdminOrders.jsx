import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [error, setError] = useState("");
  const [modal, setModal] = useState({ isOpen: false, order: null, status: "" });

  // Fetch orders
  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:6001/api/admin/orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateStatus = async (orderId, status) => {
    setUpdatingOrderId(orderId);
    setError("");
    try {
      const res = await fetch(
        `http://localhost:6001/api/admin/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Failed to update status");
        return;
      }

      const updatedOrder = await res.json();
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setUpdatingOrderId(null);
      setModal({ isOpen: false, order: null, status: "" });
    }
  };

  // Open confirmation modal
  const handleStatusChange = (order, status) => {
    setModal({ isOpen: true, order, status });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="p-4">Loading orders...</p>;
  if (!orders.length)
    return <p className="p-4">No orders found for your restaurant.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Restaurant Orders</h2>

      {error && (
        <p className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</p>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-4 border rounded-xl bg-gray-50 shadow-sm"
          >
            <h3 className="font-semibold text-lg">
              {order.restaurant?.name || "Unknown Restaurant"}
            </h3>
            <p className="text-gray-600">
              Customer: {order.user?.name || "Guest"} | Status:{" "}
              <span className="font-semibold">{order.status}</span>
            </p>
            <p>Total: ₹{order.total}</p>

            <ul className="mt-2">
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.quantity} x ₹{item.price}
                </li>
              ))}
            </ul>

            <div className="mt-2 space-x-2">
              {["pending", "preparing", "completed", "cancelled", "delivered"].map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(order, s)
                  }
                  disabled={order.status === s || updatingOrderId === order._id}
                  className={`px-2 py-1 rounded text-white transition ${
                    order.status === s
                      ? "bg-gray-300 cursor-not-allowed"
                      : s === "pending"
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : s === "preparing"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : s === "completed"
                      ? "bg-green-500 hover:bg-green-600"
                      : s === "delivered"
                      ? "bg-purple-500 hover:bg-purple-600"
                      : "bg-red-500 hover:bg-red-600"

                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">
              Confirm Status Change
            </h3>
            <p className="mb-4">
              Change order status to{" "}
              <span className="font-semibold">{modal.status}</span>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setModal({ isOpen: false, order: null, status: "" })}
                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {updateStatus(modal.order._id, modal.status)}}
                className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
