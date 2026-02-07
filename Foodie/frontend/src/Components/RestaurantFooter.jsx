import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Home, 
  ClipboardList, 
  Utensils, 
  ChevronUp, 
  Globe, 
  ShieldCheck,
  Cpu
} from "lucide-react";

const RestaurantFooter = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", path: "/admin", icon: <Home size={16} /> },
    { name: "Orders", path: "/admin/orders", icon: <ClipboardList size={16} /> },
    { name: "Restaurants", path: "/admin/restaurants", icon: <Utensils size={16} /> },
  ];

  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com" },
    { icon: <Mail size={20} />, href: "mailto:admin@foodie.com" },
  ];

  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand & Mission */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-stone-800 rounded-lg flex items-center justify-center border border-stone-700">
                <Cpu className="text-amber-500" size={18} />
              </div>
              <h2 className="text-xl font-serif italic font-bold text-white tracking-tight">
                Foodie<span className="text-amber-500">.</span> Admin
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-stone-500 max-w-xs">
              The professional suite for restaurant management. Scalable insights, real-time inventory, and seamless order logistics.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500/80">Control Center</h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="flex items-center gap-3 text-sm hover:text-white transition-colors group"
                  >
                    <span className="text-stone-700 group-hover:text-amber-500 transition-colors">
                      {link.icon}
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Infrastructure Info */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500/80">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Globe size={16} className="text-stone-700" />
                <span className="text-stone-500 italic">Cloud Infrastructure: </span>
                <span className="text-green-500 font-medium">Active</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ShieldCheck size={16} className="text-stone-700" />
                <span className="text-stone-500 italic">Security Protocol: </span>
                <span className="text-stone-300 font-medium">SSL-AES256</span>
              </div>
            </div>
          </div>

          {/* Socials & Top */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500/80">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, backgroundColor: "#292524" }}
                  className="w-10 h-10 rounded-xl border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-stone-500 hover:text-amber-500 transition-all"
            >
              <div className="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center group-hover:border-amber-500 transition-colors">
                <ChevronUp size={16} />
              </div>
              Elevate to Top
            </button>
          </div>

        </div>

        {/* Legal & Copyright */}
        <div className="mt-16 pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-widest text-stone-600">
            © {currentYear} Foodie Hospitality Systems. Proprietary Admin Panel.
          </p>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest text-stone-600 font-bold">
            <span className="hover:text-stone-400 cursor-pointer transition-colors">v2.4.0-stable</span>
            <span className="w-1 h-1 rounded-full bg-stone-800" />
            <span className="hover:text-stone-400 cursor-pointer transition-colors">System Logs</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default RestaurantFooter;