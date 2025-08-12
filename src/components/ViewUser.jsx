import React, { useState } from "react";
import axios from "axios";
import ViewUserDetailsModal from "./ViewDetailsPopup";

const ViewUser = ({ userId }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  const openUserDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${id}`);
      setSelectedUser(response.data);
      setViewOpen(true);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      alert("Error fetching user details");
    }
  };

  return (
    <>
      <button
        className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 flex items-center space-x-1"
        onClick={() => openUserDetails(userId)}
      >
        View
      </button>

      <ViewUserDetailsModal
        open={viewOpen}
        user={selectedUser}
        onClose={() => setViewOpen(false)}
      />
    </>
  );
};

export default ViewUser;
