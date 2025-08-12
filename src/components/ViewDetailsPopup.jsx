import React from "react";
import { X } from "lucide-react";

const ViewDetailsPopup = ({ isOpen, onClose, details }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">User Details</h2>

        {/* Details */}
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Username</p>
            <p className="font-medium">{details?.username || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{details?.email || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{details?.phone || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">NIC</p>
            <p className="font-medium">{details?.nic || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-medium">{details?.role || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Designation</p>
            <p className="font-medium">{details?.designation || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{details?.address || "—"}</p>
          </div>
        </div>

        {/* Footer Button */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsPopup;
