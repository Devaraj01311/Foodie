import React, { useState } from "react";
import API from "../services/API";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", data.token);

      setMessage("Login successful!");
      setIsError(false);

    
      setEmail("");
      setPassword("");

 
      setTimeout(() => {
        if(data.user.role === "restaurant" || data.user.role === "admin"){
           navigate("/admin");
        }
       
      else{
        navigate("/home");
      }
      }, 1000);
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setIsError(true);
      setMessage(err.response?.data?.message || "Login failed! Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: "url('/image/login.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 shadow-lg rounded-xl p-8 w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 mb-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 mb-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
          required
        />
         <div className="text-right mb-4">
          <Link to="/forgot-password" className="text-sm text-red-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Login
        </button>

        {message && (
          <p
            className={`mt-4 text-center font-normal ${
              isError ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-red-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
