
import React from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import CreateUserForm from '../components/CreateUserForm';
import img1 from '../assets/group.png';

function UserManage() {
  return (
    <>
      {/* Use h-screen so the column can manage its own scroll */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white">
          <Sidebar />
        </div>

        {/* Right column */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Scrollable main area */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-100 space-y-6">
            {/* Page Heading */}
            <nav className="w-full bg-white shadow-md p-4 flex items-center justify-between rounded-2xl">
              <div className="flex items-center space-x-3">
                <img
                  src={img1}
                  className="w-9 h-9"
                  alt="icon"
                />
                <div>
                  <h2 className="font-semibold text-lg leading-4">User Management</h2>
                  <span className="text-xs text-gray-500">Manage users and roles</span>
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

            {/* Create New User Form */}
            <CreateUserForm onSave={(user) => console.log('Saved:', user)} />
          </main>

          {/* Sticky Footer (sticks to bottom of the main column while content scrolls) */}
          <div className="sticky bottom-0 bg-white border-t shadow-sm">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserManage;

