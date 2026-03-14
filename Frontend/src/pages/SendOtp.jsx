import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SendOtp = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const sendOtp = async () => {
    if (!token) {
      setMessage("You must be logged in first.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/v1/Auth/send-verify-otp",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("OTP sent! Redirecting to Verify Email...");
      setTimeout(() => navigate("/verify-email"), 1500);

    } catch (error) {
      console.log(error.response);
      setMessage(error.response?.data?.error || "Failed to send OTP");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center w-96">
        <h2 className="text-2xl font-bold mb-6">Verify Email</h2>
        <button
          onClick={sendOtp}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Send OTP
        </button>
        {message && <p className="mt-4 text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default SendOtp;