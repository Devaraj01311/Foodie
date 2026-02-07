import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Info } from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);
    const toastId = toast.loading("Sending message...");
    
    try {
      const res = await axios.post(`${BASE_URL}/api/contact`, form);
      if (res.data.success) {
        toast.success("Message received. We'll be in touch.", { id: toastId });
        setForm({ name: "", email: "", message: "" });
      }
    } catch (err) {
      toast.error("Connectivity issue. Please try later.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-20">
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden rounded-b-[3rem] bg-stone-900 shadow-2xl mx-2 mt-2">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-transparent" />
        
        <div className="relative z-10 text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-serif italic font-bold text-white mb-4"
          >
            Get in <span className="text-amber-500">Touch</span>
          </motion.h1>
          <p className="text-stone-400 uppercase tracking-[0.3em] text-[10px] font-bold">Concierge & Support</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-stone-200/50 border border-stone-100"
          >
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="text-amber-500" size={24} />
              <h2 className="text-2xl font-serif italic font-bold text-stone-900">Send a Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 border-b border-stone-100 focus-within:border-amber-500 transition-colors py-2">
                  <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Full Name</p>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-transparent outline-none text-stone-800 placeholder:text-stone-200 font-medium"
                  />
                </div>
                <div className="space-y-2 border-b border-stone-100 focus-within:border-amber-500 transition-colors py-2">
                  <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Email Address</p>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full bg-transparent outline-none text-stone-800 placeholder:text-stone-200 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2 border-b border-stone-100 focus-within:border-amber-500 transition-colors py-2">
                <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Your Inquiry</p>
                <textarea
                  name="message" rows="4" value={form.message} onChange={handleChange}
                  placeholder="How can our hospitality team assist you?"
                  className="w-full bg-transparent outline-none text-stone-800 placeholder:text-stone-200 font-medium resize-none"
                />
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full bg-stone-900 hover:bg-amber-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95"
              >
                {loading ? "Transmitting..." : <><Send size={18} /> Dispatch Inquiry</>}
              </button>
            </form>
          </motion.div>

          {/* --- Contact Details & About --- */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* About Card */}
            <div className="bg-stone-900 text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
              <Info className="absolute -right-4 -top-4 text-white/5" size={150} />
              <h2 className="text-2xl font-serif italic font-bold mb-4 flex items-center gap-2">
                Our <span className="text-amber-500">Heritage</span>
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed mb-6 font-light">
                Foodie isn't just a delivery service; it's a bridge to Bengaluru's elite culinary scene. We curate experiences that turn a simple meal into a memorable gala.
              </p>
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-amber-500">
                    <Mail size={18} />
                  </div>
                  <span>concierge@foodie.com</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-amber-500">
                    <Phone size={18} />
                  </div>
                  <span>+91 80 4455 6677</span>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white p-8 rounded-[2rem] border border-stone-100 flex items-start gap-5 shadow-sm">
              <div className="bg-amber-100 p-3 rounded-2xl text-amber-600">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 mb-1">HQ Bengaluru</h4>
                <p className="text-xs text-stone-500 leading-relaxed italic font-serif">
                  Level 12, UB City Tower, Vittal Mallya Rd,<br />
                  Lavelle Road, Bengaluru 560001
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;