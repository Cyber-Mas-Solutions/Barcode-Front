
import React, { useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/Scanning.json';
import { Barcode, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EmailPopup from '../components/EmailPopup';
import OtpEnterPopup from '../components/OtpEnterPopup';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);


  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // basic validation
      if (!email || !password) {
        setError('Email and password are required');
        setLoading(false);
        return;
      }

      // login API request
      const response = await axios.post(
        'http://localhost:8080/api/users/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const data = response.data;

      // save user in localStorage
      localStorage.setItem('user', JSON.stringify(data));

     
      if (data.temporaryPassword === true || data.temporaryPassword === 'true') {
        navigate('/resetpassword', { state: { email: data.email } });
      } else if (data.role === 'Admin') {
        navigate('/dashboard');              // or: navigate('/user-management');
      } else {
        navigate('/dashboard');              // normal user landing page
      }

    } catch (err) {
      const message =
        err?.response?.data?.message ||
        (typeof err?.response?.data === 'string' ? err.response.data : null) ||
        (err?.response?.status === 401 ? 'Invalid email or password' : err?.message || 'Login failed');

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
    

     
      <div className="flex flex-col lg:flex-row flex-grow">
        <div className="lg:w-1/3 w-full flex flex-col justify-center items-center p-8 lg:p-12 relative">
          <div className="relative z-10 w-full max-w-md">

            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl shadow-xl mb-4">
                <Barcode size={28} strokeWidth={2.5}/>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                QR System
              </h1>
              <p className="text-slate-500 text-sm">Secure Barcode Management platform</p>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Welcome back</h2>
              <p className="text-slate-600">Please Log in to your account</p>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              {/* Email input */}
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  className="w-full px-4 py-4 pl-12 bg-white/70 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-slate-800 placeholder-transparent peer shadow-sm"
                  placeholder="Enter your email"
                  required
                />
                <label className={`absolute left-12 transition-all text-slate-500 ${isEmailFocused || email ? 'top-2 text-xs text-blue-600' : 'top-4 text-sm'}`}>
                  Enter your email Id
                </label>
                <Mail className="absolute left-4 top-4 text-slate-400" size={18}/>
              </div>

              {/* Password input */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  className="w-full px-4 py-4 pl-12 pr-12 bg-white/70 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-slate-800 placeholder-transparent peer shadow-sm"
                  placeholder="Enter your password"
                  required
                />
                <label className={`absolute left-12 transition-all text-slate-500 ${isPasswordFocused || password ? 'top-2 text-xs text-blue-600' : 'top-4 text-sm'}`}>
                  Enter your password
                </label>
                <Lock className="absolute left-4 top-4 text-slate-400" size={18}/>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>

              {/* <div className="text-right">
                <span
                  onClick={() => navigate('/forgotpassword')}
                  className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Forgot password?
                </span>
              </div> */}

              <div className="text-right">
                <span
                  onClick={() => setShowEmail(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Forgot password?
                </span>
              </div>


          {showEmail && (
              <EmailPopup
                onClose={() => setShowEmail(false)}
                defaultEmail={email}
                onOpenOtp={() => {
                  setShowEmail(false);
                  setShowOtpPopup(true);
                }}
              />
            )}

            {showOtpPopup && (
              <OtpEnterPopup
                email={email}                           // PASS EMAIL
                onClose={() => setShowOtpPopup(false)}  //  can close it
              />
        )}




            
   


              {/* Error */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              

              {/* Login button */}
              <button
                type="submit"
                disabled={loading}
                className="block w-full py-4 bg-gradient-to-r from-blue-700 to-blue-950 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 transition shadow-lg"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>

            </form>
          </div>
        </div>

        <div className="lg:w-2/3 w-full bg-gradient-to-br from-blue-100 via-blue-300 to-blue-800 flex flex-col justify-between">
          <div className="flex-grow flex justify-center items-center">
            <div className="w-full max-w-md">
              <Lottie animationData={animationData} loop style={{height:400}} />
            </div>
          </div>
          <Footer/>
        </div>
      </div>
    </div>
  );
}

export default Home;
