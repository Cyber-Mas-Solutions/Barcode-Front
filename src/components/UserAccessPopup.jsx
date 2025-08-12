

import React, { useState, useEffect } from "react";
import { X, CheckCircle } from "lucide-react";
import axios from "axios";

const UserAccessPopup = ({ isOpen, onClose, user }) => {
  const [enterPackageDetails, setEnterPackageDetails] = useState(0);
  const [scanBarcode, setScanBarcode] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  // Load current values when popup opens
  useEffect(() => {
    if (user) {
      setEnterPackageDetails(user.enterPackageDetails || 0);
      setScanBarcode(user.scanBarcode || 0);
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        enterPackageDetails: enterPackageDetails ? 1 : 0,
        scanBarcode: scanBarcode ? 1 : 0,
      };

      await axios.put(`http://localhost:8080/api/users/access/${user.id}`, payload);
      setSuccessPopup(true); // Show success popup after save
    } catch (err) {
      console.error(err);
      alert("Failed to update user access.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Main Access Popup */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
          {/* Close Button */}
          <button
            onClick={() => onClose(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
          >
            <X size={20} />
          </button>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Manage Access for {user.username}
          </h2>

          {/* Checkboxes */}
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={enterPackageDetails === 1}
                onChange={(e) =>
                  setEnterPackageDetails(e.target.checked ? 1 : 0)
                }
                className="w-5 h-5"
              />
              <span className="text-gray-700 font-medium">
                Enter Package Details
              </span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={scanBarcode === 1}
                onChange={(e) => setScanBarcode(e.target.checked ? 1 : 0)}
                className="w-5 h-5"
              />
              <span className="text-gray-700 font-medium">Scan Barcode</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => onClose(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {successPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[60]">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 text-center">
            <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Success!
            </h3>
            <p className="text-gray-600">
              User access updated successfully.
            </p>
            <button
              onClick={() => {
                setSuccessPopup(false);
                onClose(true); // Refresh table after closing
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAccessPopup;

