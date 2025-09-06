import React, { useState } from "react";
import API from "../services/API";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/forgot-password", { email });
      setMessage(data.message || "Password reset link sent to your email.");
      setIsError(false);
      setEmail("");
    } catch (err) {
      console.error("Forgot Password Error:", err.response?.data || err.message);
      setIsError(true);
      setMessage(err.response?.data?.error || "Something went wrong. Try again!");
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
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 mb-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Send Reset Link
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
          Remembered your password?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
