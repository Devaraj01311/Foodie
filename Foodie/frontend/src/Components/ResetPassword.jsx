import React, { useState } from "react";
import API from "../services/API";
import { useParams, Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post(`/auth/reset-password/${token}`, { password });
      setMessage(data.message || "Password reset successful!");
      setIsError(false);
      setPassword("");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Reset Password Error:", err.response?.data || err.message);
      setIsError(true);
      setMessage(err.response?.data?.error || "Reset failed. Try again!");
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
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 mb-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Reset Password
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
          Back to{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
