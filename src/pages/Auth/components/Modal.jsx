import React from "react";

const Modal = ({ isOpen, onClose, onConfirm, title, message, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold text-black">{title}</h2>
        <p className="mb-6 text-sm text-gray-700">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="rounded text-black bg-gray-200 px-4 py-2 hover:bg-gray-300"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`rounded px-4 py-2 text-white ${isLoading ? "cursor-not-allowed bg-gray-400" : "bg-[#116A7B] hover:bg-[#A7D7C5]"}`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
