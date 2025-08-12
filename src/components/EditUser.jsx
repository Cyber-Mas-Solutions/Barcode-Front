
import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateUserForm({ userId, onClose }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "User",
    password: "",
    nic: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/${userId}`)
      .then((res) => setFormData(prev => ({ ...prev, ...res.data, password: "" })))
      .catch(() => setApiError("Failed to fetch user data."));
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    setApiError("");
  };

  const validate = () => {
    const errs = {};
    if (!formData.username.trim()) errs.username = "Username is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Email is invalid";
    if (!formData.nic.trim()) errs.nic = "NIC is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    if (!formData.address.trim()) errs.address = "Address is required";
    return errs;
  };

  const generatePassword = () => {
    const newPass = Math.floor(100000 + Math.random() * 900000).toString();
    setFormData({ ...formData, password: newPass });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setApiError("");
    try {
      await axios.put(`http://localhost:8080/api/users/${userId}`, formData);
      alert("User updated successfully!");
      onClose();
      window.location.reload();
    } catch {
      setApiError("Failed to update user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-[50] h-full">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between p-6 bg-blue-100">
            <h2 className="font-bold text-xl">Update User</h2>
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
            {apiError && <p className="text-red-600 text-center mb-4">{apiError}</p>}

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Username *"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
              />
              <Input
                label="Email *"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                type="email"
              />
              <Input
                label="NIC *"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                error={errors.nic}
              />
              <Input
                label="Phone Number *"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />
              <div>
                <label className="block mb-1 font-semibold">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-3 py-2"
                >
                  <option>User</option>
                  <option>Admin</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="block mb-1 font-semibold">Password</label>
                <div className="flex gap-2">
                    <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"
                    className="flex-1 rounded-lg border px-3 py-2"
                    />
                    <button
                    type="button"
                    onClick={generatePassword}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4"
                    >
                    Generate
                    </button>
                </div>
                <p className="mt-1 text-sm text-red-600 italic">
                    To change the password, click the &quot;Generate&quot; button. Otherwise, leave this field blank to keep the current password.
                </p>
                </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className={`w-full rounded-lg border px-3 py-2 resize-none ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="text-xs text-red-500 mt-1">{errors.address}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 border-t pt-6">
              <button
                type="button"
                onClick={() => !loading && onClose()}
                className="border px-6 py-2 rounded-lg"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 ${
                  loading ? "cursor-not-allowed opacity-60" : ""
                }`}
              >
                {loading ? "Updating..." : "Update User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const Input = ({ label, name, value, onChange, error, type = "text" }) => (
  <div>
    <label className="block mb-1 font-semibold">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border px-3 py-2 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

export default UpdateUserForm;
