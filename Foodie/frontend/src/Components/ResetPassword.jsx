import React, { useState } from "react";
import API from "../services/API";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Lock, ArrowLeft, CheckCircle2 } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      return toast.error("Security key must be at least 6 characters");
    }

    setLoading(true);
    const toastId = toast.loading("Updating security credentials...");

    try {
      const { data } = await API.post(`/api/auth/reset-password/${token}`, { password });
      
      toast.success(data.message || "Credential update successful!", { id: toastId });
      setPassword("");

      // Delay navigation to allow user to see the success state
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Reset Password Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Update failed. Link may be expired.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
  
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/image/login.jpeg')" }}
      />
      <div className="absolute inset-0 bg-black/60 z-1" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
      >
        <Link 
          to="/login" 
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-amber-600 transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Return to Sign In
        </Link>

        <header className="text-center mb-10">
          <h2 className="text-3xl font-serif italic font-bold text-stone-900">
            Reset<span className="text-amber-500">Password</span>
          </h2>
          <p className="text-stone-400 text-[10px] uppercase font-bold tracking-widest mt-1">
            Secure Credential Update
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-2 border-b border-stone-100 focus-within:border-amber-500 transition-colors py-2">
            <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest flex items-center gap-2">
              <Lock size={12} className="text-amber-500" /> New Password
            </p>
            <input
              type="password"
              placeholder="Create new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-stone-800 placeholder:text-stone-200 font-medium tracking-widest"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-stone-900 hover:bg-amber-600 text-white font-bold rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            {loading ? (
              "Updating..."
            ) : (
              <>
                <CheckCircle2 size={18} /> Update Password
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-10 text-stone-400 text-[10px] uppercase tracking-[0.2em] font-medium leading-relaxed">
          Ensure your new key is unique <br /> to maintain your privacy.
        </p>
      </motion.div>
    </div>
  );
};

export default ResetPassword;