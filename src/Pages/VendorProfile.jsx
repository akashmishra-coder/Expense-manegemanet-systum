import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMail, FiPhone, FiClock, FiFileText, FiPaperclip, FiTag } from "react-icons/fi";
import { FaBolt, FaTint, FaUserTie, FaUtensils, FaTools, FaHome, FaMoneyBillWave, FaTags } from "react-icons/fa";
import { useTransactions } from "../Context/TransactionContext";

// Define icons to match TransactionTable
const categoryIcons = {
  Electricity: FaBolt,
  Water: FaTint,
  Salary: FaUserTie,
  "Food Supplies": FaUtensils,
  Maintenance: FaTools,
  Rent: FaHome,
  Deposit: FaMoneyBillWave,
  "Food Charges": FaUtensils,
  Laundry: FaTags,
  Other: FaTags,
};

const VendorProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { transactions } = useTransactions();
  
  const [previewFile, setPreviewFile] = useState(null);

  const vendor = location.state?.vendor;

  // Filter transactions
  const history = transactions.filter(
    (t) => t.vendor === vendor?.name || t.vendorId === parseInt(id)
  );

  if (!vendor) return <div className="p-10 text-center">Vendor not found.</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <h2 className="text-4xl text-center font-bold mb-8 text-gray-800">Vendor Profile</h2>
      
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition border shadow-sm rounded-lg px-4 py-2 bg-white cursor-pointer"
        >
          <FiArrowLeft /> Back to Directory
        </button>

        {/* Vendor Header Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl font-bold">
               {vendor.name.charAt(0)}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
                {vendor.type || 'Vendor'}
              </span>
              <h1 className="text-3xl font-bold text-gray-800 mt-1">{vendor.name}</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
                <div className="flex items-center gap-2 text-sm"><FiMail /> {vendor.email || "No email"}</div>
                <div className="flex items-center gap-2 text-sm"><FiPhone /> {vendor.phone || "No phone"}</div>
                <div className="flex items-center gap-2 text-sm"><FiTag /> Default Category: {vendor.category}</div>
              </div>
            </div>
          </div>
          <div className={`px-4 py-1 rounded-full text-sm font-bold ${vendor.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
            {vendor.status}
          </div>
        </div>

        {/* Transaction History Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
              <FiClock className="text-blue-500" /> Transaction History
            </h2>
            <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">Showing {history.length} records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-150 static">
              <thead>
                <tr className="text-gray-400 text-[11px] uppercase tracking-wider border-b bg-gray-50/50">
                  <th className="p-4 font-medium">Date & Category</th>
                  <th className="p-4 font-medium">Status / Method</th>
                  <th className="p-4 font-medium">Note</th>
                  <th className="p-4 font-medium text-center">Receipt</th>
                  <th className="p-4 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {history.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-10 text-center text-gray-400 italic">
                      No transaction history found for this vendor.
                    </td>
                  </tr>
                ) : (
                  history.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50 transition group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg text-gray-500 group-hover:bg-white group-hover:shadow-sm transition">
                                {categoryIcons[t.category] ? React.createElement(categoryIcons[t.category]) : <FaTags />}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800">{t.category}</p>
                                <p className="text-xs text-gray-500">{t.date}</p>
                            </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase mr-2 ${
                            t.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {t.status}
                        </span>
                        <span className="text-xs text-gray-600 font-medium">{t.paymentMethod}</span>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-gray-600 line-clamp-1 italic" title={t.note}>
                          {t.note || "—"}
                        </p>
                      </td>
                      <td className="p-4 text-center">
                        {t.files?.length > 0 ? (
                          <button 
                            onClick={() => setPreviewFile(t.files[0])}
                            className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                          >
                            <FiPaperclip size={18} />
                          </button>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className={`p-4 text-right font-bold ${t.type === 'expense' ? 'text-red-500' : 'text-green-600'}`}>
                        {t.type === 'expense' ? '-' : '+'}₹{t.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {history.length > 0 && (
                <tfoot className="bg-gray-50/80 border-t">
                  <tr className="font-bold">
                    <td colSpan="4" className="p-4 text-left text-gray-600 uppercase text-xs tracking-wider">Net Balance:</td>
                    <td className="p-4 text-right text-lg">
                      ₹{history.reduce((sum, t) => t.type === 'expense' ? sum - t.amount : sum + t.amount, 0).toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>

      {/* File Preview Modal (Same logic as TransactionTable) */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setPreviewFile(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden relative p-2" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center z-10"
              onClick={() => setPreviewFile(null)}
            >
              ×
            </button>
            <div className="overflow-auto max-h-[85vh] flex justify-center">
              {previewFile.type?.startsWith("image/") || previewFile.data?.startsWith("data:image") ? (
                <img src={previewFile.data} alt="receipt preview" className="max-w-full h-auto" />
              ) : previewFile.type?.includes("pdf") || previewFile.data?.startsWith("data:application/pdf") ? (
                <iframe src={previewFile.data} title="pdf-preview" className="w-full h-[80vh] border-none"></iframe>
              ) : (
                <div className="p-10 text-center">Cannot preview this file type.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorProfile;