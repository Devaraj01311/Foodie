import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { FaHome, FaClipboardList, FaUtensils, } from "react-icons/fa";

const RestaurantFooter = () => {
  return (
    <footer className="bg-gray-900 w-full  text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-orange-400 flex items-center gap-2">
            <span>
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="orange"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <path d="M9 9h.01" />
                <path d="M15 9h.01" />
              </svg>
            </span>
            Foodie Restaurant
          </h2>
          <p className="mt-2 text-sm">
            Manage restaurants, menus, and orders with ease.  
            Built for admin control & insights.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              
              <a
                href="/admin"
                className="hover:text-orange-400 flex items-center gap-2"
              >
             <FaHome />    Home
              </a>
            </li>
            <li>
           
              <a
                href="/admin/orders"
                className="hover:text-orange-400 flex items-center gap-2"
              >
                  <FaClipboardList />  Orders
              </a>
            </li>
            <li>
            
              <a
                href="/admin/restaurants"
                className="hover:text-orange-400 flex items-center gap-2"
              >
                <FaUtensils />   Restaurants
              </a>
            </li>
            <li>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Links</h3>
          <div className="flex space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-400"
            >
              <Github />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-400"
            >
              <Linkedin />
            </a>
            <a
              href="mailto:admin@foodie.com"
              className="hover:text-orange-400"
            >
              <Mail />
            </a>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-6 px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition flex items-center gap-2"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
            Go to Top
          </button>
        </div>
      </div>
      <div className="bg-gray-800 text-center py-4 text-sm border-t border-gray-700">
        © {new Date().getFullYear()} Foodie Restaurant Panel. All Rights Reserved.
      </div>
    </footer>
  );
};

export default RestaurantFooter;
