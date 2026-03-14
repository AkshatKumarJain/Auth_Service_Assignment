import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}

      <div className="flex justify-between items-center px-8 py-4 bg-white shadow">

        <h1 className="text-xl font-semibold text-gray-800">
          Dashboard
        </h1>

        {/* Profile Icon */}

        <div className="relative">

          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold"
          >
            U
          </button>

          {/* Dropdown */}

          {open && (

            <div className="absolute right-0 mt-3 w-48 bg-white border rounded-lg shadow">

              <button
                onClick={() => navigate("/profile")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                View Profile
              </button>

              <button
                onClick={() => navigate("/send-verify-otp")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Verify Email
              </button>

              <button
                onClick={() => navigate("/logout")}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

      {/* Dashboard Body */}

      <div className="flex items-center justify-center h-[80vh] text-gray-400 text-xl">

        Welcome to your dashboard

      </div>

    </div>

  );

};

export default Dashboard;