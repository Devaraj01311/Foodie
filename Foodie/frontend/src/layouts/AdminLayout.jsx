import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaHome, FaClipboardList, FaUtensils, } from "react-icons/fa";


const AdminLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-200 text-gray-800 shadow-lg flex-shrink-0 p-8">
        <h2 className="text-4xl -mt-3 font-serif  underline ml-2 mb-12">Restaurant</h2>
       <nav className="flex font-bold  flex-col ml-3 gap-4">
  <Link to="/admin" className="flex items-center gap-2 hover:text-orange-400">
    <FaHome /> Home
  </Link>
  <Link to="/admin/orders" className="flex items-center gap-2 hover:text-orange-400">
    <FaClipboardList /> Orders
  </Link>
  <Link to="/admin/restaurants" className="flex items-center gap-2 hover:text-orange-400">
    <FaUtensils /> Restaurants
  </Link>
  <div className="justify-between mt-48">
  <div className="border-t  border-gray-900 my-4"></div>
  <h2 className="text-2xl font-bold ">About us</h2>
  <p className="text-sm text-gray-600 mt-4">
    We are a team of food enthusiasts dedicated to bringing you the best dining experiences.
  </p>
  <div className="border-t  border-gray-900 my-4"></div>
  <h2 className="text-2xl font-bold ">Privacy and Policy</h2>
  <p className="text-sm text-gray-600 mt-4">
    We are committed to ensuring the privacy and security of our users.
  </p>
  </div>
</nav>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-gray-200 shadow flex items-center justify-between px-6">
        <Link
  className="text-gray-800 font-extrabold text-3xl tracking-wide hover:text-orange-400 transition flex flex-col"
>
  <span>Foodie</span>
  <div className="flex items-center mt-1 text-sm">
    <i className="fas fa-map-marker-alt"></i>
    <span className="ml-1 text-gray-600 font-thin ">
      Bengaluru
    </span>
  </div>
</Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-800 font-semibold text-white rounded-lg hover:bg-gray-600"
          >
            Logout
          </button>
        </header>
        <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
