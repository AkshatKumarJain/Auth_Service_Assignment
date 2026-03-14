import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp) {
      setMessage("Please enter OTP.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/v1/Auth/verify-email",
        { otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Email verified successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);

    } catch (error) {
      console.log(error.response);
      setMessage(error.response?.data?.error || "Verification failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleVerify}
        className="bg-white p-8 rounded-xl shadow-md w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Enter OTP</h2>
        <input
          type="text"
          placeholder="Enter OTP from email"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Verify Email
        </button>
        {message && <p className="mt-2 text-red-500 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default VerifyEmail;