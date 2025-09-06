import React, { useState } from "react";
import API from "../services/API";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); 
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("All fields are required");
      setIsError(true);
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      setIsError(true);
      return;
    }

    try {
      setLoading(true);
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      console.log("Register Success:", data);
      setIsError(false);
      setMessage("Registration successful! Please login.");
      setName("");
      setEmail("");
      setPassword("");
      setRole("customer");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error("Register Error:", err.response?.data || err.message);
      setIsError(true);
      setMessage(err.response?.data?.message || "Registration failed! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-100"
      style={{
        backgroundImage: "url('/image/login.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Create New Account
        </h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 mb-4 py-2 border rounded-lg focus:ring-red-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 mb-4 py-2 border rounded-lg focus:ring-red-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 mb-4 py-2 border rounded-lg focus:ring-red-500"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 mb-4 py-2 border rounded-lg focus:ring-red-500"
        >
          <option value="customer">Customer</option>
          <option value="restaurant">Restaurant</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white ${
            loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {loading ? "Registering..." : "Register"}
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
        <h1 className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-red-500">
            Login
          </a>
        </h1>
      </form>
    </div>
  );
};

export default Register;
