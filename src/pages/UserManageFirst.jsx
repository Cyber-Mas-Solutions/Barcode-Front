
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from '../components/Sidebar';
// import Footer from '../components/Footer';
// import CreateUserForm from '../components/CreateUserForm';
// import { Eye, EyeOff, Clipboard, Eye as ViewIcon, Edit2, Trash2 } from 'lucide-react';
// import img1 from '../assets/group.png';
// import ViewDetailsPopup from '../components/ViewDetailsPopup';
// import EditUser from '../components/EditUser';


// function UserManageFirst() {
//   const [showForm, setShowForm] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [visiblePasswords, setVisiblePasswords] = useState({});
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [copiedId, setCopiedId] = useState(null);              // <--- NEW
//   const [viewPopupOpen, setViewPopupOpen] = useState(false);
//   const [selectedUserDetails, setSelectedUserDetails] = useState(null);

//   const [editPopupOpen, setEditPopupOpen] = useState(false);
//   const [userToEdit, setUserToEdit] = useState(null);
  
// // ---------------------------------------Api------------------------------------------------------------------------------------------------

//   useEffect(() => {
//     async function fetchUsers() {
//       try {
//         const res = await axios.get("http://localhost:8080/api/users/all");
//         setUsers(res.data);
//       } catch (err) {
//         // setError("Failed to fetch users");      meka change kara 
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchUsers();
//   }, []);

//   if (loading) return <p>Loading users...</p>;
//   if (error) return <p>{error}</p>;


//   const handleViewClick = async (id) => {
//     try {
//       const res = await axios.get(`http://localhost:8080/api/users/${id}`);
//       setSelectedUserDetails(res.data);
//       setViewPopupOpen(true);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//       alert("Failed to load user details");
//     }
//   };

//   const handleEditClick = async (id) => {
//   try {
//     const res = await axios.get(`http://localhost:8080/api/users/${id}`);
//     setUserToEdit(res.data);
//     setEditPopupOpen(true);
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     alert("Failed to load user details for editing");
//   }
// };


// // -------------------------------------------------------------------------------------------------------------------------------------------

//   const togglePasswordVisibility = (id) => {
//     setVisiblePasswords((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   // NEW - handle copying and showing badge
//   const handleCopy = (id, text) => {
//     navigator.clipboard.writeText(text)
//       .then(() => {
//         setCopiedId(id);
//         setTimeout(() => setCopiedId(null), 1500);
//       })
//       .catch(() => console.error("Failed to copy"));
//   };

//   return (
//     <div className="flex h-screen">
//       <div className="w-64 bg-gray-800 text-white">
//         <Sidebar />
//       </div>
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <main className="flex-1 overflow-y-auto p-6 bg-gray-100 space-y-6">

//           {/* NAVBAR */}
//           <nav className="w-full bg-white shadow-md p-4 flex items-center justify-between rounded-2xl">
//             <div className="flex items-center space-x-3">
//               <img src={img1} className="w-9 h-9" alt="icon" />
//               <div>
//                 <h2 className="font-semibold text-lg leading-4">User Management</h2>
//                 <span className="text-xs text-gray-500">Manage user and roles</span>
//               </div>
//             </div>
//             <div className="text-center">
//               <div className="text-sm font-medium">{new Date().toLocaleDateString()}</div>
//               <div className="text-xs text-gray-500">{new Date().toLocaleTimeString()}</div>
//             </div>
//             <div className="flex items-center space-x-2 bg-gray-200 py-2 px-3 rounded-md">
//               <img
//                 src="https://img.icons8.com/fluency/48/settings.png"
//                 className="w-6 h-6"
//                 alt="settings"
//               />
//               <span className="text-sm font-medium">Settings</span>
//             </div>
//           </nav>

//           {/* Add Button */}
//           <div className="flex justify-end">
//             <button
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//               onClick={() => setShowForm(true)}
//             >
//               Add New User
//             </button>
//           </div>

//           {/* Popup Create Form */}
//           {showForm && (
//             <div className="fixed inset-0 z-50 flex bg-black/30 items-center justify-center backdrop-blur-sm">
//               <CreateUserForm
//                 onSave={(user) => {
//                   setUsers([...users, { id: users.length + 1, ...user }]);
//                   setShowForm(false);
//                 }}
//                 onClose={() => setShowForm(false)}
//               />
//             </div>
//           )}

//           {/* USERS TABLE */}
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
//             <div className="p-6 border-b border-gray-100">
//               <h3 className="text-lg font-semibold text-gray-900">User List</h3>
//               <p className="text-sm text-gray-500">Manage and view all registered users</p>
//             </div>
//             <div className="overflow-auto max-h-[600px]">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full table-auto border border-gray-300">
//                   <thead className="bg-green-50 sticky top-0">
//                     <tr>
//                       {['Username','Email','Phone','NIC','Role','Designation','Address','Password','Action'].map(title => (
//                         <th key={title} className="px-6 py-4 text-center text-xs font-semibold text-green-800 uppercase border border-gray-300">
//                           {title}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100">
//                     {users.map((user) => (
//                       <tr key={user.id}
//                           className={`transition-all cursor-pointer ${selectedUserId === user.id ? 'bg-green-50 border-l-4 border-l-green-500' : 'bg-white hover:bg-gray-100'}`}
//                           onClick={() => setSelectedUserId(user.id)}>
//                         <td className="px-6 py-4 text-center border border-gray-300">{user.username}</td>
//                         <td className="px-6 py-4 text-center border border-gray-300">{user.email}</td>
//                         <td className="px-6 py-4 text-center border border-gray-300">{user.phone}</td>
//                         <td className="px-6 py-4 text-center border border-gray-300">{user.nic}</td>
//                         <td className="px-6 py-4 text-center border border-gray-300">
//                           <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'Admin' ? 'bg-red-100 text-red-800':'bg-gray-100 text-gray-800'}`}>
//                             {user.role}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-center border border-gray-300">{user.designation}</td>
//                         <td className="px-6 py-4 text-center border border-gray-300 truncate">{user.address}</td>

//                         {/* Password column */}
//                         <td className="px-6 py-4 text-center border border-gray-300">
//                           <div className="flex items-center justify-center space-x-2">
//                             <span className="font-mono text-sm">{visiblePasswords[user.id] ? user.password : '•'.repeat(user.password?.length ?? 8)}</span>
//                             <button
//                               onClick={(e) => {e.stopPropagation(); togglePasswordVisibility(user.id);}}
//                               className="p-1.5 rounded hover:bg-green-100">
//                               {visiblePasswords[user.id] ? (<EyeOff size={16} className="text-green-600"/>) : (<Eye size={16} className="text-green-600"/>)}
//                             </button>
//                             <div className="relative">
//                               <button
//                                 onClick={(e)=>{e.stopPropagation(); handleCopy(user.id,user.password);}}
//                                 className="p-1.5 rounded hover:bg-green-100">
//                                 <Clipboard size={16} className="text-green-600"/>
//                               </button>
//                               {copiedId === user.id && (
//                                 <span className="absolute top-0 left-full ml-1 bg-green-50 rounded px-2 py-0.5 text-xs text-green-600">Copied!</span>
//                               )}
//                             </div>
//                           </div>
//                         </td>

//                         {/* Action buttons */}
//                         <td className="px-6 py-4 text-center border border-gray-300">
//                           <div className="flex justify-center space-x-2">
                            
//                            <button
//                               className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded hover:bg-blue-700 flex items-center space-x-1"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleViewClick(user.id);
//                               }}
//                             >
//                               <ViewIcon size={14} />
//                               <span>View</span>
//                             </button>

//                             <button
//                               className="bg-yellow-500 text-white text-xs px-3 py-1.5 rounded hover:bg-yellow-600 flex items-center space-x-1"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleEditClick(user.id);
//                               }}
//                             >
//                               <Edit2 size={14} />
//                               <span>Edit</span>
//                             </button>

//                             <button className="bg-red-600 text-white text-xs px-3 py-1.5 rounded hover:bg-red-700 flex items-center space-x-1">
//                               <Trash2 size={14}/><span>Delete</span>
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>

//               </div>
//             </div>
//           </div>
//         </main>

        
//         <ViewDetailsPopup
//           isOpen={viewPopupOpen}
//           onClose={() => setViewPopupOpen(false)}
//           details={selectedUserDetails}
//         />

//           {/* Popup Edit Form */}
//           {editPopupOpen && userToEdit && (
//             <div className="fixed inset-0 z-50 flex bg-black/30 items-center justify-center backdrop-blur-sm">
//               <EditUser
//                 userId={userToEdit.id}
//                 initialData={userToEdit}
//                 onSave={(updatedUser) => {
//                   setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
//                   setEditPopupOpen(false);
//                   setUserToEdit(null);
//                 }}
//                 onClose={() => {
//                   setEditPopupOpen(false);
//                   setUserToEdit(null);
//                 }}
//               />
//             </div>
//           )}

//         <div className="sticky bottom-0 bg-white border-t shadow-sm">
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserManageFirst;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import CreateUserForm from '../components/CreateUserForm';
import { Eye, EyeOff, Clipboard, Eye as ViewIcon, Edit2, Trash2, CheckCircle } from 'lucide-react'; // added CheckCircle
import img1 from '../assets/group.png';
import ViewDetailsPopup from '../components/ViewDetailsPopup';
import EditUser from '../components/EditUser';

function UserManageFirst() {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  // NEW: state for delete success popup
  const [deleteSuccessPopup, setDeleteSuccessPopup] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("http://localhost:8080/api/users/all");
        setUsers(res.data);
      } catch (err) {
        setError(err.message || "Failed to fetch users");
      } 
      // finally {
      //   setLoading(false);
      // }
    }
    fetchUsers();
  }, []);

  // if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  const handleViewClick = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/users/${id}`);
      setSelectedUserDetails(res.data);
      setViewPopupOpen(true);
    } catch (error) {
      console.error("Error fetching user:", error);
      alert("Failed to load user details");
    }
  };

  const handleEditClick = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/users/${id}`);
      setUserToEdit(res.data);
      setEditPopupOpen(true);
    } catch (error) {
      console.error("Error fetching user:", error);
      alert("Failed to load user details for editing");
    }
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/api/users/delete/${id}`);
      // Remove deleted user from state
      setUsers(users.filter(user => user.id !== id));

      // Show delete success popup
      setDeleteSuccessPopup(true);

      // Auto-hide popup after 2 seconds (optional)
      setTimeout(() => setDeleteSuccessPopup(false), 2000);

    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 1500);
      })
      .catch(() => console.error("Failed to copy"));
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100 space-y-6">

          {/* NAVBAR */}
          <nav className="w-full bg-white shadow-md p-4 flex items-center justify-between rounded-2xl">
            <div className="flex items-center space-x-3">
              <img src={img1} className="w-9 h-9" alt="icon" />
              <div>
                <h2 className="font-semibold text-lg leading-4">User Management</h2>
                <span className="text-xs text-gray-500">Manage user and roles</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">{new Date().toLocaleDateString()}</div>
              <div className="text-xs text-gray-500">{new Date().toLocaleTimeString()}</div>
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

          {/* Add Button */}
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              onClick={() => setShowForm(true)}
            >
              Add New User
            </button>
          </div>

          {/* Popup Create Form */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex bg-black/30 items-center justify-center backdrop-blur-sm">
              <CreateUserForm
                onSave={(user) => {
                  setUsers([...users, { id: users.length + 1, ...user }]);
                  setShowForm(false);
                }}
                onClose={() => setShowForm(false)}
              />
            </div>
          )}

          {/* USERS TABLE */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">User List</h3>
              <p className="text-sm text-gray-500">Manage and view all registered users</p>
            </div>
            <div className="overflow-auto max-h-[600px]">
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-300">
                  <thead className="bg-green-50 sticky top-0">
                    <tr>
                      {['Username','Email','Phone','NIC','Role','Designation','Address','Password','Action'].map(title => (
                        <th key={title} className="px-6 py-4 text-center text-xs font-semibold text-green-800 uppercase border border-gray-300">
                          {title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((user) => (
                      <tr key={user.id}
                          className={`transition-all cursor-pointer ${selectedUserId === user.id ? 'bg-green-50 border-l-4 border-l-green-500' : 'bg-white hover:bg-gray-100'}`}
                          onClick={() => setSelectedUserId(user.id)}>
                        <td className="px-6 py-4 text-center border border-gray-300">{user.username}</td>
                        <td className="px-6 py-4 text-center border border-gray-300">{user.email}</td>
                        <td className="px-6 py-4 text-center border border-gray-300">{user.phone}</td>
                        <td className="px-6 py-4 text-center border border-gray-300">{user.nic}</td>
                        <td className="px-6 py-4 text-center border border-gray-300">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'Admin' ? 'bg-red-100 text-red-800':'bg-gray-100 text-gray-800'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center border border-gray-300">{user.designation}</td>
                        <td className="px-6 py-4 text-center border border-gray-300 truncate">{user.address}</td>

                        {/* Password column */}
                        <td className="px-6 py-4 text-center border border-gray-300">
                          <div className="flex items-center justify-center space-x-2">
                            <span className="font-mono text-sm">{visiblePasswords[user.id] ? user.password : '•'.repeat(user.password?.length ?? 8)}</span>
                            <button
                              onClick={(e) => {e.stopPropagation(); togglePasswordVisibility(user.id);}}
                              className="p-1.5 rounded hover:bg-green-100">
                              {visiblePasswords[user.id] ? (<EyeOff size={16} className="text-green-600"/>) : (<Eye size={16} className="text-green-600"/>)}
                            </button>
                            <div className="relative">
                              <button
                                onClick={(e)=>{e.stopPropagation(); handleCopy(user.id,user.password);}}
                                className="p-1.5 rounded hover:bg-green-100">
                                <Clipboard size={16} className="text-green-600"/>
                              </button>
                              {copiedId === user.id && (
                                <span className="absolute top-0 left-full ml-1 bg-green-50 rounded px-2 py-0.5 text-xs text-green-600">Copied!</span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Action buttons */}
                        <td className="px-6 py-4 text-center border border-gray-300">
                          <div className="flex justify-center space-x-2">
                            
                           <button
                              className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded hover:bg-blue-700 flex items-center space-x-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewClick(user.id);
                              }}
                            >
                              <ViewIcon size={14} />
                              <span>View</span>
                            </button>

                            <button
                              className="bg-yellow-500 text-white text-xs px-3 py-1.5 rounded hover:bg-yellow-600 flex items-center space-x-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(user.id);
                              }}
                            >
                              <Edit2 size={14} />
                              <span>Edit</span>
                            </button>

                            {/* <button
                              className="bg-red-600 text-white text-xs px-3 py-1.5 rounded hover:bg-red-700 flex items-center space-x-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(user.id);
                              }}
                            >
                              <Trash2 size={14} /><span>Delete</span>
                            </button> */}


                            {user.role !== 'Admin' && (
                              <button
                                className="bg-red-600 text-white text-xs px-3 py-1.5 rounded hover:bg-red-700 flex items-center space-x-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteClick(user.id);
                                }}
                              >
                                <Trash2 size={14} /><span>Delete</span>
                              </button>
                            )}

                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </main>

        
        <ViewDetailsPopup
          isOpen={viewPopupOpen}
          onClose={() => setViewPopupOpen(false)}
          details={selectedUserDetails}
        />

          {/* Popup Edit Form */}
          {editPopupOpen && userToEdit && (
            <div className="fixed inset-0 z-50 flex bg-black/30 items-center justify-center backdrop-blur-sm">
              <EditUser
                userId={userToEdit.id}
                initialData={userToEdit}
                onSave={(updatedUser) => {
                  setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
                  setEditPopupOpen(false);
                  setUserToEdit(null);
                }}
                onClose={() => {
                  setEditPopupOpen(false);
                  setUserToEdit(null);
                }}
              />
            </div>
          )}

          {/* Delete Success Popup */}
          {deleteSuccessPopup && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[60]">
              <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 text-center">
                <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Success!
                </h3>
                <p className="text-gray-600">
                  User deleted successfully.
                </p>
                <button
                  onClick={() => setDeleteSuccessPopup(false)}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  OK
                </button>
              </div>
            </div>
          )}

        <div className="sticky bottom-0 bg-white border-t shadow-sm">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default UserManageFirst;