import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const SuccessPopup = ({ success, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center space-y-4">
        {success ? (
          <>
            <CheckCircle2 className="mx-auto w-12 h-12 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-800">User Registration Successfully</h3>
          </>
        ) : (
          <>
            <XCircle className="mx-auto w-12 h-12 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-800">User Registration Unsuccessful</h3>
          </>
        )}

        <button
          onClick={onClose}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;


