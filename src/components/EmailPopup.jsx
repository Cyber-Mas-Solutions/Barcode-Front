
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmailPopup({ onClose, defaultEmail }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);            // 1 = enter email, 2 = enter OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();


  useEffect(() => {
    setEmail(defaultEmail || "");
  }, [defaultEmail]);

  const handleSendEmail = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/forgot-password",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage(response.data);
      
      // switch to OTP step
      setStep(2);
    } catch (err) {
      if (err?.response?.status === 404) {
        setMessage("User not found");
      } else {
        setMessage("Error sending OTP");
      }
    } finally {
      setLoading(false);
    }
  };

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
        { email, otp: otpCode }
      );
      setMessage(res.data);
      navigate("/resetpassword")
    } catch (err) {
      setMessage(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm h-full bg-black/30 z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[350px] text-center">
        <h2 className="text-xl font-semibold mb-2">
          {step === 1 ? "Forgot Password" : "Enter OTP"}
        </h2>

        {step === 1 ? (
          <>
            <p className="text-sm text-gray-500 mb-4">
              Enter your email to receive OTP
            </p>

            {message && <p className="mb-3 text-sm text-green-600">{message}</p>}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 mb-6 border rounded-md focus:border-blue-500 focus:outline-none"
            />

            <button
              onClick={handleSendEmail}
              disabled={loading}
              className="w-full py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 mb-3"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <p className="text-sm mb-4 text-gray-500">
              OTP sent to <b>{email}</b>
            </p>
            {message && <p className="text-sm text-red-600 mb-2">{message}</p>}

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
          </>
        )}

        <button
          onClick={onClose}
          className="w-full py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200 text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default EmailPopup;
