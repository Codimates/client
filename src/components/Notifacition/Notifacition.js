import React, { useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";

const Notification = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); 

    return () => clearTimeout(timer); 
  }, [onClose]);

  const iconStyles = {
    success: "text-green-500",
    error: "text-red-500",
    info: "text-blue-500",
  };

  const iconMap = {
    success: <FaCheckCircle className={`w-6 h-6 ${iconStyles.success}`} />,
    error: <FaExclamationCircle className={`w-6 h-6 ${iconStyles.error}`} />,
    info: <FaInfoCircle className={`w-6 h-6 ${iconStyles.info}`} />,
  };

  return (
    <div
      className={`fixed top-4 right-4 flex items-center space-x-3 p-4 max-w-sm rounded-lg shadow-lg bg-white border-l-4 ${
        type === "success"
          ? "border-green-500"
          : type === "error"
          ? "border-red-500"
          : "border-blue-500"
      }`}
    >
      {iconMap[type]}
      <div>
        <p className="text-gray-800 font-medium">{message}</p>
      </div>
      <button
        className="text-gray-400 hover:text-gray-600 focus:outline-none"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
};

export default Notification;
