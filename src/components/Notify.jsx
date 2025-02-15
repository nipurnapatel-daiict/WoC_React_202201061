import React from "react";

const Toast = ({ message, onClose }) => {
  return (
    <div
      className="fixed top-5 right-5 flex items-center justify-between bg-green-500 text-white py-2 px-4 rounded-md shadow-lg z-50"
      role="alert"
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-xl font-semibold text-white hover:text-gray-200"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
