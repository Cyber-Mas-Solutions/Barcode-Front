

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function EditProfile({ onClose }) {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     role: "",
//     nic: "",
//     phone: "",
//     address: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [apiError, setApiError] = useState("");

//   const sanitizeUserData = (data) => ({
//     username: data.username || "",
//     email: data.email || "",
//     role: data.role || "",
//     nic: data.nic || "",
//     phone: data.phone || "",
//     address: data.address || "",
//     password: "",
//     confirmPassword: "",
//   });

//   // Fetch logged-in user details
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/users/me", {
//         withCredentials: true, // in case your backend uses cookies/session
//       })
//       .then((res) => {
//         setFormData(sanitizeUserData(res.data));
//         setApiError("");
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//         setApiError("Failed to fetch user data.");
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (errors[e.target.name]) {
//       setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
//     }
//     setApiError("");
//   };

//   const validate = () => {
//     const errs = {};
//     if (!formData.email.trim()) errs.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Email is invalid";

//     if (!formData.phone.trim()) errs.phone = "Phone number is required";

//     if (formData.password || formData.confirmPassword) {
//       if (formData.password.length < 6) errs.password = "Password must be at least 6 characters";
//       if (formData.password !== formData.confirmPassword)
//         errs.confirmPassword = "Passwords do not match";
//     }

//     return errs;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errs = validate();
//     if (Object.keys(errs).length > 0) {
//       setErrors(errs);
//       return;
//     }

//     setLoading(true);
//     setApiError("");
//     try {
//       const updateData = {
//         username: formData.username,
//         role: formData.role,
//         nic: formData.nic,
//         email: formData.email,
//         phone: formData.phone,
//         address: formData.address,
//       };

//       if (formData.password) {
//         updateData.password = formData.password;
//       }

//       await axios.put("http://localhost:8080/api/users/me", updateData, {
//         withCredentials: true,
//       });

//       alert("Profile updated successfully!");
//       onClose();
//       window.location.reload();
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       setApiError("Failed to update profile. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div className="p-4 text-center">Loading user data...</div>;
//   if (apiError && !loading)
//     return <div className="p-4 text-red-600 text-center">{apiError}</div>;

//   return (
//     <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-[50] h-full">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between p-6 bg-blue-100">
//           <h2 className="font-bold text-xl">Edit Profile</h2>
//           <button
//             onClick={() => !loading && onClose()}
//             className="text-xl font-bold"
//             aria-label="Close form"
//             disabled={loading}
//           >
//             ×
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {apiError && <p className="text-red-600 text-center mb-4">{apiError}</p>}

//           <div className="grid md:grid-cols-2 gap-6">
//             <Input label="Username" name="username" value={formData.username} onChange={handleChange} />
//             <Input label="Role" name="role" value={formData.role} onChange={handleChange} />
//             <Input label="NIC" name="nic" value={formData.nic} onChange={handleChange} />
//             <Textarea label="Address" name="address" value={formData.address} onChange={handleChange} />

//             <Input
//               label="Email *"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               error={errors.email}
//             />
//             <Input
//               label="Phone Number *"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               error={errors.phone}
//             />
//             <Input
//               label="New Password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               error={errors.password}
//               placeholder="Leave blank to keep current password"
//             />
//             <Input
//               label="Confirm New Password"
//               name="confirmPassword"
//               type="password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               error={errors.confirmPassword}
//               placeholder="Confirm new password"
//             />
//           </div>

//           <div className="flex justify-end gap-3 border-t pt-6">
//             <button
//               type="button"
//               onClick={() => !loading && onClose()}
//               className="border px-6 py-2 rounded-lg"
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 ${
//                 loading ? "cursor-not-allowed opacity-60" : ""
//               }`}
//             >
//               {loading ? "Updating..." : "Update Profile"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// const Input = ({ label, name, value, onChange, error, type = "text", placeholder }) => (
//   <div>
//     <label className="block mb-1 font-semibold">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className={`w-full rounded-lg border px-3 py-2 ${
//         error ? "border-red-500" : "border-gray-300"
//       }`}
//     />
//     {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
//   </div>
// );

// const Textarea = ({ label, name, value, onChange, error }) => (
//   <div>
//     <label className="block mb-1 font-semibold">{label}</label>
//     <textarea
//       name={name}
//       value={value}
//       onChange={onChange}
//       rows={3}
//       className={`w-full rounded-lg border px-3 py-2 resize-none ${
//         error ? "border-red-500" : "border-gray-300"
//       }`}
//     />
//     {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
//   </div>
// );

// export default EditProfile;



import React, { useState, useEffect } from "react";
import axios from "axios";

function EditProfile({ onClose }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    nic: "",
    phone: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const token = localStorage.getItem("token");

  const sanitizeUserData = (data) => ({
    username: data.username || "",
    email: data.email || "",
    role: data.role || "",
    nic: data.nic || "",
    phone: data.phone || "",
    address: data.address || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!token) {
      setApiError("Authentication required. Please login again.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:8080/api/users/me/details", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setFormData(sanitizeUserData(res.data)))
      .catch(() => setApiError("Failed to fetch user data."))
      .finally(() => setLoading(false));
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Email is invalid";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";

    if (formData.newPassword || formData.confirmPassword || formData.currentPassword) {
      if (!formData.currentPassword) errs.currentPassword = "Current password is required";
      if (formData.newPassword.length < 6) errs.newPassword = "Password must be at least 6 characters";
      if (formData.newPassword !== formData.confirmPassword)
        errs.confirmPassword = "Passwords do not match";
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      // 1. Update profile details
      await axios.put(
        "http://localhost:8080/api/users/me/update",
        {
          username: formData.username,
          role: formData.role,
          nic: formData.nic,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2. If password fields filled, update password separately
      if (formData.newPassword) {
        await axios.put(
          "http://localhost:8080/api/users/me/password",
          {
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      alert("Profile updated successfully!");
      onClose();
      window.location.reload();
    } catch (err) {
      console.error(err);
      setApiError("Failed to update profile/password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (apiError) return <div className="p-4 text-red-600 text-center">{apiError}</div>;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-[50] h-full">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between p-6 bg-blue-100">
          <h2 className="font-bold text-xl">Edit Profile</h2>
          <button
            onClick={() => !loading && onClose()}
            className="text-xl font-bold"
            aria-label="Close form"
            disabled={loading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Username" name="username" value={formData.username} onChange={handleChange} />
            <Input label="Role" name="role" value={formData.role} onChange={handleChange} />
            <Input label="NIC" name="nic" value={formData.nic} onChange={handleChange} />
            <Textarea label="Address" name="address" value={formData.address} onChange={handleChange} />

            <Input label="Email *" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
            <Input label="Phone Number *" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} />

            <Input label="Current Password" name="currentPassword" type="password" value={formData.currentPassword} onChange={handleChange} error={errors.currentPassword} placeholder="Enter current password" />
            <Input label="New Password" name="newPassword" type="password" value={formData.newPassword} onChange={handleChange} error={errors.newPassword} placeholder="Leave blank to keep current password" />
            <Input label="Confirm New Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} placeholder="Confirm new password" />
          </div>

          <div className="flex justify-end gap-3 border-t pt-6">
            <button type="button" onClick={() => !loading && onClose()} className="border px-6 py-2 rounded-lg" disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading} className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 ${loading ? "cursor-not-allowed opacity-60" : ""}`}>
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Input = ({ label, name, value, onChange, error, type = "text", placeholder }) => (
  <div>
    <label className="block mb-1 font-semibold">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full rounded-lg border px-3 py-2 ${error ? "border-red-500" : "border-gray-300"}`}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

const Textarea = ({ label, name, value, onChange, error }) => (
  <div>
    <label className="block mb-1 font-semibold">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      className={`w-full rounded-lg border px-3 py-2 resize-none ${error ? "border-red-500" : "border-gray-300"}`}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

export default EditProfile;