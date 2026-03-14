import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {

    const logoutUser = async () => {

      try {

        await axios.post(
          "http://localhost:8000/api/v1/Auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

      } catch (error) {
        console.log("Logout API error:", error);
      }

      localStorage.removeItem("token");

      navigate("/login");

    };

    logoutUser();

  }, []);

  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">

      <h1 className="text-xl font-semibold">
        Logging out...
      </h1>

    </div>

  );
};

export default Logout;