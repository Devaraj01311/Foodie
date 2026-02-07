import React, { useState } from "react";
import API from "../services/API";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { UserPlus, ChevronDown } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password must be 6+ characters");
    setLoading(true);
    try {
      await API.post("/api/auth/register", { name, email, password, role });
      toast.success("Membership Created!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
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
        className="relative z-10 w-full max-w-md bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
      >
        <header className="text-center mb-8">
          <h2 className="text-3xl font-serif italic font-bold text-stone-900">Register<span className="text-amber-500">Account</span></h2>
          <p className="text-stone-400 text-[10px] uppercase font-bold tracking-widest mt-1">New Account Registration</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1 border-b border-stone-100 focus-within:border-amber-500 py-2 transition-all">
            <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Full Name</p>
            <input 
              type="text" value={name} onChange={e => setName(e.target.value)} required
              className="w-full bg-transparent outline-none text-stone-800 placeholder:text-stone-200"
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-1 border-b border-stone-100 focus-within:border-amber-500 py-2 transition-all">
            <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Email Address</p>
            <input 
              type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full bg-transparent outline-none text-stone-800 placeholder:text-stone-200"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-1 border-b border-stone-100 focus-within:border-amber-500 py-2 transition-all">
            <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Password</p>
            <input 
              type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full bg-transparent outline-none text-stone-800 placeholder:text-stone-200"
              placeholder="Enter password"
            />
          </div>

          <div className="relative space-y-1 border-b border-stone-100 py-2">
            <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Account Type</p>
            <select 
              value={role} onChange={e => setRole(e.target.value)}
              className="w-full bg-transparent outline-none font-bold text-amber-600 appearance-none cursor-pointer"
            >
              <option value="customer">Customer</option>
              <option value="restaurant">Restaurant</option>
            </select>
            <ChevronDown className="absolute right-0 bottom-3 text-stone-300 pointer-events-none" size={14} />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-4 bg-stone-900 hover:bg-amber-600 text-white font-bold rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2"
          >
            {loading ? "Processing..." : <><UserPlus size={18} />Sign Up</>}
          </button>
        </form>

        <p className="text-center mt-8 text-stone-400 text-sm ">
          Already a Account? <Link to="/login" className="text-amber-600 font-bold hover:underline ml-1">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;