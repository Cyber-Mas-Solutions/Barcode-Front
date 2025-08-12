
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OtpEnterPopup({ onClose, email }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setMessage("Please enter all 6 digits.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:8080/api/users/verify-otp",
        {
          email,
          otp: otpCode,
        }
      );
      setMessage(res.data);

      // On success → redirect to reset password
      setTimeout(() => {
        navigate("/resetpassword", { state: { email } });
      }, 1000);
      
    } catch (err) {
      setMessage(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm ">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[350px] text-center">
        <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>

        {/* Autofilled, readonly email  */}
        <div className="mb-4">
          <input
            type="email"
            value={email}
            
            className="w-full px-4 py-3 border rounded-md bg-gray-100 text-gray-500"
            
          />
         
        </div>
        

        {message && (
          <p className="text-sm text-red-600 mb-4">{message}</p>
        )}

        <div className="flex justify-between space-x-2 mb-6">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, i)}
              maxLength="1"
              className="w-10 h-12 text-center border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            />
          ))}
        </div>

        <button
          onClick={handleVerifyOtp}
          disabled={loading}
          className="w-full py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 mb-3"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button
          onClick={onClose}       // ✅ fixed
          className="w-full py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200 text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default OtpEnterPopup;
