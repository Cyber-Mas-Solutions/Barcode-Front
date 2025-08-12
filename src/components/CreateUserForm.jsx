

import React, { useState } from "react";
import axios from "axios";
import {
  X, User, Mail, Phone, CreditCard, Shield, MapPin,
  CheckCircle2, XCircle
} from "lucide-react";

const roles = ["User", "Admin"];
const designations = [
  "Software Engineer", "Project Manager", "QA Engineer",
  "Business Analyst", "Designer", "HR Manager"
];

const CreateUserForm = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    username: "", email: "", phone: "", nic: "",
    role: "User", designation: "", address: ""
  });

  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState({
    show: false, success: true, message: ""
  });

  const [allowCloseForm, setAllowCloseForm] = useState(false); // Track if form can close

  const validateForm = () => {
    const errs = {};
    if (!formData.username.trim()) errs.username = "Username is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email";
    if (!formData.phone.trim()) errs.phone = "Phone is required";
    if (!formData.nic.trim()) errs.nic = "NIC is required";
    if (!formData.designation.trim()) errs.designation = "Designation is required";
    if (!formData.address.trim()) errs.address = "Address is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Show success popup immediately on submit click
    setPopup({ show: true, success: true, message: "User created successfully!" });

    const payload = {
      ...formData,
      empNo: `EMP${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`
    };

    try {
      await axios.post("http://localhost:8080/api/users/register", payload, {
        headers: { "Content-Type": "application/json" }
      });
      onSave(payload);
      setAllowCloseForm(true); // Allow closing after success
    } catch (err) {
      console.error("Error creating user:", err);
      
      
      setPopup({
        show: true,
        success: false,
        message: "User creation unsuccessful."
      });
      setAllowCloseForm(false); // Do not allow form close on failure
    }
  };

  const closePopup = () => {
    setPopup({ show: false, success: true, message: "" });
    if (allowCloseForm) {
      onClose(); // Close form only if allowed (success)
    }
    // Otherwise form stays open for retry
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  return (
    <>
      {/* POPUP */}
      {popup.show && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-sm h-full">
          <div className="bg-white p-8 rounded-xl w-96 text-center space-y-4 shadow-2xl">
            {popup.success
              ? <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto" />
              : <XCircle className="w-14 h-14 text-red-500 mx-auto" />}
            <p className="text-lg font-semibold text-gray-800">
              {popup.message}
            </p>
            <button
              onClick={closePopup}
              className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* FORM */}
      <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-[50] h-full">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between p-6  bg-blue-100">
            <h2 className="font-bold text-xl flex items-center gap-2">
              <User /> Add New User
            </h2>
            {/* prevent closing while popup.show */}
            <button      onClick={() => !popup.show && onClose() }    ><X /></button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Username *" name="username"
                value={formData.username} onChange={handleChange}
                error={errors.username}
              />
              <Input
                label="Email *" name="email"
                value={formData.email} onChange={handleChange}
                error={errors.email}
              />
              <Input
                label="Phone *" name="phone"
                value={formData.phone} onChange={handleChange}
                error={errors.phone}
              />
              <Input
                label="NIC *" name="nic"
                value={formData.nic} onChange={handleChange}
                error={errors.nic}
              />
              <div>
                <label>Role</label>
                <select
                  name="role" value={formData.role} onChange={handleChange}
                  className="w-full rounded-lg border px-3 py-2">
                  {roles.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label>Designation *</label>
                <select
                  name="designation" value={formData.designation} onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2 ${errors.designation ? 'border-red-500' : 'border-gray-300'}`}>
                  <option value="">Select designation</option>
                  {designations.map(d => <option key={d}>{d}</option>)}
                </select>
                {errors.designation && <p className="text-xs text-red-500">{errors.designation}</p>}
              </div>
            </div>
            <div>
              <label>Address *</label>
              <textarea
                name="address"
                className={`w-full rounded-lg border px-3 py-2 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.address} onChange={handleChange} rows="3" />
              {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
            </div>
            <div className="flex justify-end gap-3 border-t pt-6">
              {/* prevent closing while popup.show */}
              <button type="button" onClick={() => !popup.show && onClose()} className="border px-6 py-2 rounded-lg">Cancel</button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const Input = ({ label, name, value, onChange, error }) => (
  <div>
    <label className="block mb-1">{label}</label>
    <input
      name={name} value={value} onChange={onChange}
      className={`w-full border rounded-lg px-3 py-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export default CreateUserForm;