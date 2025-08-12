

import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, PlusCircle } from "lucide-react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import img1 from "../assets/group.png"; 
import UserAccessPopup from "../components/UserAccessPopup.jsx";

function UserAccessPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/all")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load user data");
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  const renderIcon = (value) => {
    return value === 1 ? (
      <CheckCircle className="text-green-500 w-6 h-6 mx-auto" />
    ) : (
      <XCircle className="text-red-500 w-6 h-6 mx-auto" />
    );
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100 space-y-6">
          {/* Page header */}
          <nav className="w-full bg-white shadow-md p-4 flex items-center justify-between rounded-2xl">
            <div className="flex items-center space-x-3">
              <img src={img1} className="w-9 h-9" alt="icon" />
              <div>
                <h2 className="font-semibold text-lg leading-4">
                  User Access Management
                </h2>
                <span className="text-xs text-gray-500">
                  Manage user permissions for package entry & barcode scanning
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

          {/* Table Section */}
          {loading ? (
            <p>Loading user data...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-6 space-y-4">
              {/* Description above the table */}
              <div className="text-sm text-gray-600">
                <p>
                  This table shows user access permissions.{" "}
                  <strong>Green check</strong> indicates the user has access,{" "}
                  <strong>red cross</strong> indicates no access.
                </p>
                <p>
                  You can manage user permissions by clicking the{" "}
                  <PlusCircle className="inline-block w-5 h-5 text-blue-600 ml-1 mr-1" />{" "}
                  icon in the Action column.
                </p>
              </div>

              {/* The table */}
              <table className="min-w-full table-auto border border-gray-300">
                <thead className="bg-green-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase border border-gray-300">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase border border-gray-300">
                      Username
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-green-800 uppercase border border-gray-300">
                      Enter Package Details
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-green-800 uppercase border border-gray-300">
                      Scan Barcode
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-green-800 uppercase border border-gray-300">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr
                        key={user.id}
                        className="transition-all cursor-pointer hover:bg-gray-100"
                      >
                        <td className="px-6 py-4 text-center border border-gray-300">
                          {user.id}
                        </td>
                        <td className="px-6 py-4 border border-gray-300">
                          {user.username}
                        </td>
                        <td className="px-6 py-4 text-center border border-gray-300">
                          {renderIcon(user.enterPackageDetails)}
                        </td>
                        <td className="px-6 py-4 text-center border border-gray-300">
                          {renderIcon(user.scanBarcode)}
                        </td>
                        <td className="px-6 py-4 text-center border border-gray-300">
                          {/* <button
                            onClick={() => console.log("Clicked on", user.username)}
                            className="text-blue-600 hover:text-blue-800 flex items-center justify-center mx-auto p-1 rounded"
                            aria-label={`Manage access for ${user.username}`}
                          >
                            <PlusCircle className="w-6 h-6" />
                          </button> */}


                            <button
                                onClick={() => {
                                    setSelectedUser(user);
                                    setIsPopupOpen(true);
                                }}
                                className="text-blue-600 hover:text-blue-800 flex items-center justify-center mx-auto p-1 rounded"
                                >
                                <PlusCircle className="w-6 h-6" />
                            </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4 text-gray-500"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>

        <UserAccessPopup
            isOpen={isPopupOpen}
            onClose={(shouldRefresh) => {
                setIsPopupOpen(false);
                setSelectedUser(null);
                if (shouldRefresh) {
                // re-fetch users
                axios.get("http://localhost:8080/api/users/all").then(res => setUsers(res.data));
                }
            }}
            user={selectedUser}
        />

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t shadow-sm">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default UserAccessPage;
