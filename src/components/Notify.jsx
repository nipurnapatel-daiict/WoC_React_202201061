import React from "react";

const Toast = ({ message, onClose }) => {
  return (
<div
  className="fixed top-5 right-5 flex items-center justify-between bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg z-50 transition-transform transform duration-300 ease-out opacity-100"
  role="alert"
>
  <span className="font-medium text-lg">{message}</span>
  <button
    onClick={onClose}
    className="ml-4 text-2xl font-semibold text-white hover:text-gray-200 focus:outline-none"
    aria-label="Close"
  >
    &times;
  </button>
</div>


  );
};

export default Toast;
