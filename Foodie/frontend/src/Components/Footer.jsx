import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  ArrowUp, 
  MapPin, 
  Mail, 
  Phone,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-stone-950 text-stone-400 font-sans">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/20">
                <span className="text-white font-serif text-xl font-bold">F</span>
              </div>
              <h2 className="text-2xl font-serif italic font-bold text-white tracking-tight">
                Foodie<span className="text-amber-500">.</span>
              </h2>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-stone-500">
              Redefining the culinary landscape of Bengaluru. We connect world-class chefs with passionate food enthusiasts through a seamless digital experience.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {[
                { icon: <Instagram size={18} />, link: "#" },
                { icon: <Facebook size={18} />, link: "#" },
                { icon: <Twitter size={18} />, link: "#" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  whileHover={{ y: -3, color: "#f59e0b" }}
                  className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center hover:border-amber-500 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-200">Navigation</h3>
            <ul className="space-y-4">
              {['Home', 'Restaurants', 'Orders', 'Cart'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase()}`} 
                    className="group flex items-center gap-2 text-sm hover:text-white transition-colors"
                  >
                    <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-amber-500" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-200">Concierge</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-amber-500 mt-0.5 shrink-0" />
                <span>Level 4, Prestige Shantiniketan, Whitefield, Bengaluru, KA 560048</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-amber-500 shrink-0" />
                <span>+91 80 4567 8900</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-amber-500 shrink-0" />
                <span>hospitality@foodie.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA Section */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-200">The Newsletter</h3>
            <p className="text-xs text-stone-500 italic font-serif">Join our circle for exclusive culinary events.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-stone-900 border-none rounded-xl py-3 px-4 text-sm focus:ring-1 focus:ring-amber-500 outline-none transition-all"
              />
              <button className="absolute right-2 top-1.5 p-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-stone-500 hover:text-amber-500 transition-colors group"
            >
              Back to top <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-medium text-stone-600">
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-stone-400">Privacy Policy</Link>
            <span className="w-1 h-1 rounded-full bg-stone-800" />
            <Link to="/terms" className="hover:text-stone-400">Terms of Service</Link>
          </div>
          <div className="text-center">
            © {currentYear} FOODIE HOSPITALITY PVT LTD. MADE WITH PRIDE IN INDIA.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;