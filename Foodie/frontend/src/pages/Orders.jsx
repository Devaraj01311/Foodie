import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  XCircle, 
  IndianRupee, 
  Calendar,
  Utensils
} from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${BASE_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusUI = (status) => {
    switch (status) {
      case "pending":
        return { color: "text-stone-400 bg-stone-100", icon: <Clock size={14} /> };
      case "preparing":
        return { color: "text-amber-600 bg-amber-50", icon: <Utensils size={14} /> };
      case "completed":
        return { color: "text-emerald-600 bg-emerald-50", icon: <CheckCircle size={14} /> };
      case "cancelled":
        return { color: "text-red-600 bg-red-50", icon: <XCircle size={14} /> };
      case "delivered":
        return { color: "text-blue-600 bg-blue-50", icon: <Truck size={14} /> };
      default:
        return { color: "text-gray-500 bg-gray-50", icon: <Package size={14} /> };
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-20">
      {/* Header Section */}
      <section className="relative h-[35vh] flex items-center justify-center overflow-hidden rounded-b-[3rem] bg-stone-900 shadow-2xl mx-2 mt-2">
        <div className="absolute inset-0 opacity-40 bg-[url('/public/order.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent" />
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-serif italic font-bold text-white mb-2"
          >
            Your <span className="text-amber-500">Orders</span>
          </motion.h1>
          <p className="text-stone-400 uppercase tracking-[0.3em] text-[10px] font-bold">Past & Present Orders</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-10">
        {loading ? (
          <div className="text-center py-20 text-stone-400 italic">Curating your history...</div>
        ) : orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white rounded-[2.5rem] p-16 text-center shadow-xl border border-stone-100"
          >
            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
           
              <IndianRupee className="text-stone-200" size={32} />
            </div>
            <h3 className="text-2xl font-serif italic font-bold text-stone-800 mb-2">No Orders Found</h3>
            <p className="text-stone-400 text-sm mb-8 italic">Your culinary adventure is yet to begin.</p>
            <button className="px-8 py-3 bg-stone-900 text-white rounded-2xl font-bold hover:bg-amber-600 transition-all shadow-lg shadow-stone-200">
              Start Exploring
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {orders.map((order, index) => {
                const statusUI = getStatusUI(order.status);
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={order._id}
                    className="group bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-stone-100 hover:shadow-xl hover:shadow-stone-200/40 transition-all duration-500"
                  >
                    {/* Order Meta Header */}
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8 border-b border-stone-50 pb-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-stone-50 rounded-2xl text-stone-400">
                          <Package size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest mb-1">Order Identifier</p>
                          <h4 className="font-mono text-xs text-stone-800 bg-stone-50 px-2 py-1 rounded">#{order._id.slice(-8).toUpperCase()}</h4>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${statusUI.color}`}>
                          {statusUI.icon} {order.status}
                        </div>
                      </div>
                    </div>

                    {/* Items Section */}
                    <div className="space-y-4 mb-8">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center group/item">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-stone-50 text-stone-400 flex items-center justify-center text-[10px] font-bold border border-stone-100 group-hover/item:bg-amber-500 group-hover/item:text-white transition-colors">
                              {item.quantity}
                            </span>
                            <span className="text-stone-800 font-medium">{item.name}</span>
                          </div>
                          {/* 4. Using the formatting helper */}
                          <span className="text-stone-400 font-medium text-sm">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                      <div className="flex items-center gap-6">
                         <div className="flex items-center gap-2 text-stone-400 text-xs">
                           <Calendar size={14} />
                           <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                         </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-bold text-stone-400 mb-1">Total Paid</p>
                        {/* 5. Using the formatting helper */}
                        <p className="text-2xl font-serif italic font-bold text-stone-900">
                          {formatPrice(order.total)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;