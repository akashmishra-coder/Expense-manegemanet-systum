import React, { createContext, useState, useEffect, useMemo, useContext } from "react";
import {data} from "./Data";

// 1. Create the Context
const TransactionContext = createContext();

// 2. Create a custom hook so you don't have to import useContext everywhere
export const useTransactions = () => useContext(TransactionContext);

// 3. Create the Provider Component
export const TransactionProvider = ({ children }) => {
  // --- STATE ---
  const [transactions, setTransactions] = useState(data.transactions);

  // --- VENDORS STATE (New) ---
  const [vendors, setVendors] = useState(data.vendors);

  const [categories, setCategories] = useState({
    income: ["Rent", "Deposit", "Food Charges", "Laundry", "Other"],
    expense: ["Electricity", "Water", "Salary", "Food Supplies", "Maintenance", "Other"],
  });

  // Modal & Edit State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Filter State
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // --- EFFECTS ---
  // Auto-save to LocalStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Save vendors to LocalStorage (New)
  useEffect(() => {
    localStorage.setItem("vendors", JSON.stringify(vendors));
  }, [vendors]);

  // --- DERIVED DATA (Filters) ---
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((item) => {
        const itemDate = new Date(item.date);
        const matchesDate =
          (!fromDate || itemDate >= new Date(fromDate)) &&
          (!toDate || itemDate <= new Date(toDate));
        const matchesType =
          typeFilter === "all" ||
          item.type === typeFilter ||
          item.status?.toLowerCase() === typeFilter.toLowerCase();

        return matchesDate && matchesType;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, fromDate, toDate, typeFilter]);

  // --- ACTIONS ---
  const addTransaction = (data) => {
    if (editData) {
      setTransactions((prev) => prev.map((item) => (item.id === data.id ? data : item)));
      setEditData(null);
    } else {
      setTransactions((prev) => [data, ...prev]);
    }
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  // New Vendor Actions
  const addVendor = (newVendor) => {
    setVendors((prev) => [newVendor, ...prev]);
  };

  const deleteVendor = (id) => {
    setVendors((prev) => prev.filter((v) => v.id !== id));
  };

  const resetFilters = () => {
    setFromDate("");
    setToDate("");
    setTypeFilter("all");
  };

  // 4. Provide everything to the app
  return (
    <TransactionContext.Provider
      value={{
        transactions,
        filteredTransactions,
        categories,
        setCategories,
        isModalOpen,
        setIsModalOpen,
        editData,
        setEditData,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        typeFilter,
        setTypeFilter,
        addTransaction,
        deleteTransaction,
        resetFilters,
        vendors, // New
        addVendor, // New
        deleteVendor, // New
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};