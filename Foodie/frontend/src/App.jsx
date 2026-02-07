import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast'; 
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hero from "./pages/Hero";
import RestaurantPage from "./pages/restaurantpage";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Menu from "./Components/restaurantMenu";
import { CartProvider } from "./context/CartContext";
import Cart from "./Components/Cart";
import Orders from "./pages/Orders";
import ProtectedRoute from "./Components/ProtectedRoute";
import RestaurantAdmin from "./pages/RestaurantAdmin";
import AdminOrders from "./pages/AdminOrders";
import MyRestaurant from "./Components/Myreastaurant";

import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Contact from "./pages/ContactPage";

const App = () => {
  return (
    <CartProvider>
         <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <Router>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route index element={<Hero />} /> 
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
          </Route>


          <Route element={<AdminLayout />}>
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin", "restaurant"]}>
                  <RestaurantAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute allowedRoles={["admin", "restaurant"]}>
                  <AdminOrders />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/restaurants" 
            element={
              <ProtectedRoute allowedRoles={["admin", "restaurant"]}>
                <MyRestaurant />
              </ProtectedRoute>
            }
            />
          </Route>


          <Route element={<MainLayout />}>
            <Route
              path="home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="restaurants"
              element={
                <ProtectedRoute>
                  <RestaurantPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="menu"
              element={
                <ProtectedRoute>
                  <Menu />
                </ProtectedRoute>
              }
            />
            <Route
              path="cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="contact"
              element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              }
            />
          </Route>

    
          <Route
            path="*"
            element={<h1 className="text-center mt-20">404 - Page Not Found</h1>}
          />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
