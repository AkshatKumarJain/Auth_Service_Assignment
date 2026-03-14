import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/Auth/login",
        {
          email,
          password,
        }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token.accessToken);
        localStorage.setItem("refreshToken", res.data.token.refreshToken);
        navigate("/dashboard");
      }

    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96 flex flex-col gap-4"
      >

        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded">
            {error}
          </p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Links */}
        <div className="text-sm text-center mt-2">

          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>

          <p className="mt-1">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>

        </div>

      </form>

    </div>
  );
};

export default Login;