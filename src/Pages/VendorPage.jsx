import React, { useState } from "react";
import {
  FiUserPlus,
  FiTrash2,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiArrowLeft,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import { useTransactions } from "../Context/TransactionContext";
import { Link } from "react-router-dom";

const VendorPage = () => {
  // Local state for our vendors (You can move this to TransactionContext later if needed globally!)
  const { categories, vendors, addVendor, deleteVendor } = useTransactions();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    type: "expense", // Default to expense, can be changed to income if needed
    category: categories.expense[0] || "", // Default to first expense category
    email: "",
    phone: "",
    status: "Active",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(""); // Clear error on typing
  };

  const handleAddVendor = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.category) {
      setError("Vendor Name and Category are required.");
      return;
    }

    const newVendor = {
      id: Date.now(),
      ...formData,
    };

    addVendor(newVendor);

    // Reset form but keep the default category
    setFormData({
      name: "",
      type: "expense",
      category: categories.expense[0] || "",
      email: "",
      phone: "",
      status: "Active",
    });
  };

  const handleDeleteVendor = (id) => {
    deleteVendor(id);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Vendor Management
          </h1>
          <p className="text-gray-500 mt-2">
            Add and manage your service providers and suppliers.
          </p>
        </div>

        {/* Back Button */}
        <button
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition border shadow-sm rounded-lg px-4 py-2 bg-white"
        >
         <Link to="/" className="flex items-center gap-2"> <FiArrowLeft /> Back to Directory </Link>
         </button>

        {/* Add Vendor Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
            <FiUserPlus className="text-blue-500" /> Add New Vendor
          </h2>

          <form
            onSubmit={handleAddVendor}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-6 items-end"
          >
            {/* Vendor Name */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Vendor Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., John Doe Plumbers"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Type Toggle (Income vs Expense) */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">Vendor Type</label>
              <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => handleInputChange({ target: { name: "type", value: "income" }})}
                  className={`flex-1 flex items-center justify-center gap-1 py-1 px-2 rounded-lg text-xs font-bold transition ${formData.type === "income" ? "bg-white text-green-600 shadow-sm" : "text-gray-500 cursor-pointer"}`}
                >
                  <FiTrendingUp /> Income
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange({ target: { name: "type", value: "expense" }})}
                  className={`flex-1 flex items-center justify-center gap-1 py-1 px-2 rounded-lg text-xs font-bold transition ${formData.type === "expense" ? "bg-white text-red-600 shadow-sm" : "text-gray-500 cursor-pointer"}`}
                >
                  <FiTrendingDown /> Expense
                </button>
              </div>
            </div>

            {/* Dynamic Category Dropdown */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {categories[formData.type].map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Email */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="vendor@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Phone */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 234 567 890"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="lg:col-span-1">
              <button
                type="submit"
                className="w-full px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
              >
                Save Vendor
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>

        {/* Vendors List / Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
              <FiBriefcase className="text-blue-500" /> Vendor Directory
            </h2>
            <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border shadow-sm">
              Total: {vendors.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b text-gray-500 text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium">Vendor Name</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Contact Info</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {vendors.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-400">
                      No vendors added yet.
                    </td>
                  </tr>
                ) : (
                  vendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-gray-50 transition">
                      <td className="p-4">
                        <Link
                          to={`/vendors/${vendor.id}`}
                          state={{ vendor }} // Passing vendor data via state saves an extra lookup
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          {vendor.name}
                        </Link>
                      </td>
                      <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${vendor.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {vendor.type}
                      </span>
                    </td>
                      <td className="p-4">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-100">
                          {vendor.category}
                        </span>
                      </td>
                      <td className="p-4 space-y-1">
                        {vendor.email && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FiMail className="text-gray-400" /> {vendor.email}
                          </div>
                        )}
                        {vendor.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FiPhone className="text-gray-400" /> {vendor.phone}
                          </div>
                        )}
                        {!vendor.email && !vendor.phone && (
                          <span className="text-sm text-gray-400 italic">
                            No contact info
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                          {vendor.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteVendor(vendor.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                          title="Delete Vendor"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPage;
