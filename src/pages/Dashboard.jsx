
import React from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import img1 from '../assets/dashboard.png';

import imgParcel from '../assets/parcel.png';
import imgScan from '../assets/scan.png';
import imgScanner from '../assets/scanner.png';


function Dashboard() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Right column */}
      <div className="flex flex-col flex-1 overflow-hidden bg-gray-100">
        {/* Scrollable main area */}
        <main className="flex-1 overflow-y-auto p-8 space-y-10">
          {/* Page Heading */}
          <nav className="w-full bg-white shadow-md p-4 flex items-center justify-between rounded-2xl">
            <div className="flex items-center space-x-3">
              <img src={img1} className="w-9 h-9" alt="icon" />
              <div>
                <h2 className="font-semibold text-lg leading-4">Dashboard</h2>
                <span className="text-xs text-gray-500">
                  Manage user profiles, assign roles, and control access permissions.
                </span>
              </div>
            </div>

            <div className="text-center">
              <div id="date" className="text-sm font-medium"></div>
              <div id="time" className="text-xs text-gray-500"></div>
            </div>

            <div className="flex items-center space-x-2 bg-gray-200 py-2 px-3 rounded-md">
              <img
                src="https://img.icons8.com/fluency/48/settings.png"
                className="w-6 h-6"
                alt="settings"
              />
              <span className="text-sm font-medium">Settings</span>
            </div>
          </nav>

          {/* Greeting Section */}
          {/* Greeting Section */}
<section className="bg-white p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto flex flex-col items-center space-y-6">
  {/* Text Content */}
  <div className="text-center">
    <h1 className="text-5xl font-extrabold text-gray-900 mb-2">
      Good morning, <span className="text-indigo-600">Dhanushka</span>
    </h1>
    <p className="text-4xl font-extrabold text-gray-700">
      Welcome To the system
    </p>
  </div>

  {/* Icon Images */}
  
</section>

  <div className="flex justify-center items-center ">
  <div className="flex items-center space-x-8">
    <img src={imgParcel} alt="parcel" className="w-20 h-20 hover:animate-bounce transition duration-300" />
<img src={imgScan} alt="scan" className="w-20 h-20 hover:animate-bounce transition duration-300" />
<img src={imgScanner} alt="scanner" className="w-20 h-20 hover:animate-bounce transition duration-300" />

  </div>
</div>


        </main>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-white border-t shadow-sm">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

