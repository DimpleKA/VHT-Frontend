import React, { useEffect } from "react";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Loader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/home"), 3000); // Navigate to /home after 3 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-black">
      <RingLoader color="#ffffff" size={150} />
    </div>
  );
};

export default Loader;
