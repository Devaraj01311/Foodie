import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_API_URL;

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required");
      navigate("/login");
      return;
    }

    const toastId = toast.loading("Processing Order...");
    try {
      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          restaurant: cart[0].restaurantId,
          items: cart.map(i => ({ name: i.name, price: i.price, quantity: i.qty })),
          total
        }),
      });

      if (res.ok) {
        toast.success("Order Placed Successfully!", { id: toastId });
        clearCart();
        setTimeout(() => navigate("/orders"), 1500);
      } else {
        toast.error("Order Failed", { id: toastId });
      }
    } catch (err) {
      toast.error("Network Error", { id: toastId });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 pb-32">
      <header className="mb-12">
        <h2 className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-2">Checkout</h2>
        <h1 className="text-4xl font-serif italic font-bold text-stone-900">Your Selection</h1>
      </header>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-stone-200">
          <ShoppingBag size={48} className="mx-auto text-stone-200 mb-4" />
          <p className="text-stone-400 font-serif italic mb-8 text-xl">Your basket is currently empty</p>
          <button onClick={() => navigate("/restaurants")} className="px-10 py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-amber-600 transition-all">
            Browse Restaurants
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item, index) => (
            <motion.div 
              layout
              key={index} 
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-stone-100 flex items-center gap-6"
            >
              <img src={item.image} className="w-24 h-24 object-cover rounded-2xl shadow-inner" alt="" />
              <div className="flex-1">
                <h4 className="text-xl font-serif italic font-bold text-stone-800">{item.name}</h4>
                <p className="text-amber-600 font-bold">₹{item.price}</p>
              </div>
              
              <div className="flex items-center bg-stone-50 rounded-xl p-1 border border-stone-100">
                <button onClick={() => updateQuantity(item.name, item.qty - 1)} className="p-2 hover:bg-white rounded-lg transition-colors"><Minus size={16} /></button>
                <span className="px-4 font-bold text-stone-800">{item.qty}</span>
                <button onClick={() => updateQuantity(item.name, item.qty + 1)} className="p-2 hover:bg-white rounded-lg transition-colors"><Plus size={16} /></button>
              </div>

              <button onClick={() => removeFromCart(item.name)} className="p-3 text-stone-300 hover:text-red-500 transition-colors">
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))}

          <div className="mt-12 bg-stone-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="flex justify-between items-center mb-8 relative z-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-1">Total Amount</p>
                <h3 className="text-5xl font-serif italic font-bold text-amber-500">₹{total}</h3>
              </div>
              <ShoppingBag size={40} className="text-stone-700" />
            </div>
            <button 
              onClick={handlePlaceOrder}
              className="w-full py-5 bg-amber-500 text-stone-950 rounded-2xl font-bold text-lg hover:bg-amber-400 transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              Complete Order <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;