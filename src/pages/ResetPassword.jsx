

import React, { useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/Scanning.json';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // if email was passed from login page, use it
  React.useEffect(() => {
    if (location?.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !newPassword || !confirmPassword) {
      return setError('All fields are required');
    }
    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      await axios.post('http://localhost:8080/api/users/reset-password', {
        email,
        newPassword
      });

      setSuccess('Password reset successful, please login again.');
      setTimeout(() => navigate('/'), 1500); // redirect to login after 1.5 sec
    } catch (err) {
      setError(err?.response?.data || 'Failed to reset password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <div className="flex flex-col lg:flex-row flex-grow">
        <div className="lg:w-1/3 w-full flex flex-col justify-center items-center p-8 lg:p-12 relative">
          <div className="relative z-10 w-full max-w-md">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl shadow-xl mb-4 transform hover:scale-105 transition-transform duration-300">
                <Mail size={28} strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                Reset Password
              </h1>
            </div>

            <form className="space-y-6" onSubmit={handleReset}>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 pl-12 bg-white/70 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 placeholder-transparent peer shadow-sm"
                  placeholder="Enter your email"
                />
                <label className="absolute left-12 top-2 text-xs text-blue-600">
                  Enter your email Id
                </label>
                <Mail className="absolute left-4 top-4 text-slate-400" size={18} />
              </div>

              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-4 pl-12 pr-12 bg-white/70 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 placeholder-transparent peer shadow-sm"
                  placeholder="Enter new password"
                />
                <label className="absolute left-12 top-2 text-xs text-blue-600">
                  Enter new password
                </label>
                <Lock className="absolute left-4 top-4 text-slate-400" size={18} />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-4 text-slate-400"
                >
                  {showNewPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-4 pl-12 pr-12 bg-white/70 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 placeholder-transparent peer shadow-sm"
                  placeholder="Confirm password"
                />
                <label className="absolute left-12 top-2 text-xs text-blue-600">
                  Confirm new password
                </label>
                <Lock className="absolute left-4 top-4 text-slate-400" size={18} />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-4 text-slate-400">
                  {showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}

              <button type="submit"
                      className="block w-full py-4 bg-gradient-to-r from-blue-700 to-blue-950 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 transition shadow-lg">
                Reset Password
              </button>
            </form>
          </div>
        </div>

        <div className="lg:w-2/3 w-full bg-gradient-to-br from-blue-100 via-blue-300 to-blue-800 flex flex-col justify-between">
          <div className="flex-grow flex justify-center items-center">
            <div className="w-full max-w-md">
              <Lottie animationData={animationData} loop style={{ height: 400 }} />
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

