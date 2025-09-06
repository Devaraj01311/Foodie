
import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 ">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
      
      <div>
        <h2 className="text-2xl font-bold text-orange-400 flex items-center gap-2">
        <span>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/></svg>
        </span>
        Foodie
        </h2>
        <p className="mt-2 text-sm">
        Your favorite dishes delivered fresh to your doorstep.  
        Taste the best from our partnered restaurants.
        </p>
        <p className="mt-4 text-sm">Made with ❤️ in India</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
        <ul className="space-y-2 text-sm">
        <li><a href="/" className="hover:text-orange-400 flex items-center gap-2"><span><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l9-9 9 9"/><path d="M9 21V9h6v12"/></svg></span>Home</a></li>
        <li><a href="/restaurants" className="hover:text-orange-400 flex items-center gap-2"><span><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2"/></svg></span>Restaurants</a></li>
        <li><a href="/orders" className="hover:text-orange-400 flex items-center gap-2"><span><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/></svg></span>My Orders</a></li>
        <li><a href="/contact" className="hover:text-orange-400 flex items-center gap-2"><span><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4.5"/><path d="M21 10.5a8.38 8.38 0 0 1-3.5 6.88"/><path d="M3 10.5a8.38 8.38 0 0 0 3.5 6.88"/><path d="M12 22v-6"/></svg></span>Contact Us</a></li>
        <li><a href="/cart" className="hover:text-orange-400 flex items-center gap-2"><span><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></span>Cart</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
        <div className="flex space-x-4">
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-orange-400">
          <Facebook />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-orange-400">
          <Instagram />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-orange-400">
          <Twitter />
        </a>
        </div>
          <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="mt-6 px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition flex items-center gap-2"
        >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
        Go to Top
        </button>
      </div>
      
      </div>
      
      <div className="bg-gray-800 text-center py-4 text-sm border-t border-gray-700">
      © {new Date().getFullYear()} Foodie. All Rights Reserved.
      </div>
    </footer>
    );
};

export default Footer;
