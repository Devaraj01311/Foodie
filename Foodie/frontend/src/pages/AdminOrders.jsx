import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  Truck, 
  ChefHat, 
  AlertCircle, 
  RefreshCw,
  ShoppingBag,
  User
} from "lucide-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, order: null, status: "" });

  const BASE_URL = import.meta.env.VITE_API_URL;

  // --- Helpers for UI ---
  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "preparing": return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "delivered": return "bg-purple-100 text-purple-800 border-purple-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending": return <Clock size={16} />;
      case "preparing": return <ChefHat size={16} />;
      case "completed": return <CheckCircle size={16} />;
      case "delivered": return <Truck size={16} />;
      case "cancelled": return <XCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  const fetchOrders = async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      setOrders(data);
      if (isRefresh) toast.success("Orders refreshed!");
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    setUpdatingOrderId(orderId);
    const toastId = toast.loading("Updating status...");
    
    try {
      const res = await fetch(
        `${BASE_URL}/api/admin/orders/${orderId}`,
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
        throw new Error(errorData.message || "Failed to update");
      }

      const updatedOrder = await res.json();
      
      // Update local state with animation friendly approach
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
      
      toast.success(`Order marked as ${status}`, { id: toastId });
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error(err.message || "Something went wrong", { id: toastId });
    } finally {
      setUpdatingOrderId(null);
      setModal({ isOpen: false, order: null, status: "" });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // --- Handlers ---
  const handleStatusChange = (order, status) => {
    setModal({ isOpen: true, order, status });
  };

  // --- Render ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <RefreshCw className="text-blue-500 w-10 h-10" />
        </motion.div>
        <p className="text-gray-500 font-medium">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto min-h-screen bg-gray-50/50">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Order Management</h2>
          <p className="text-gray-500 mt-1">Manage and track restaurant orders</p>
        </div>
        <button 
          onClick={() => fetchOrders(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors text-gray-700 font-medium"
        >
          <RefreshCw size={18} /> Refresh List
        </button>
      </div>

      {!orders.length ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100"
        >
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-600 font-medium">No active orders found.</p>
        </motion.div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {orders.map((order) => (
              <motion.div
                layout
                key={order._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800 truncate pr-2">
                      {order.restaurant?.name || "Unknown Restaurant"}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <User size={14} />
                    <span>{order.user?.name || "Guest Customer"}</span>
                  </div>
                </div>
                <div className="p-5 flex-grow">
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Items</p>
                    <ul className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex justify-between text-sm text-gray-700 items-center">
                          <span className="truncate w-3/4">
                            <span className="font-bold text-gray-900">{item.quantity}x</span> {item.name}
                          </span>
                          <span className="text-gray-500">₹{item.price * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-gray-500 font-medium">Total Amount</span>
                    <span className="text-xl font-bold text-gray-900">₹{order.total}</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 flex gap-2 overflow-x-auto pb-4 custom-scrollbar">
                  {["pending", "preparing", "completed", "delivered", "cancelled"].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(order, s)}
                      disabled={order.status === s || updatingOrderId === order._id}
                      className={`
                        flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all duration-200 transform active:scale-95
                        ${order.status === s 
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50" 
                          : s === "pending" ? "bg-white text-yellow-600 border border-yellow-200 hover:bg-yellow-50"
                          : s === "preparing" ? "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
                          : s === "completed" ? "bg-white text-green-600 border border-green-200 hover:bg-green-50"
                          : s === "delivered" ? "bg-white text-purple-600 border border-purple-200 hover:bg-purple-50"
                          : "bg-white text-red-600 border border-red-200 hover:bg-red-50"
                        }
                      `}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>
        {modal.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-100"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className={`p-3 rounded-full mb-4 ${getStatusColor(modal.status)}`}>
                   {getStatusIcon(modal.status)}
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Update Order Status?
                </h3>
                <p className="text-gray-500 mt-2">
                  Are you sure you want to change this order to <span className="font-bold text-gray-800 uppercase">{modal.status}</span>?
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setModal({ isOpen: false, order: null, status: "" })}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateStatus(modal.order._id, modal.status)}
                  className="px-4 py-2.5 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminOrders;