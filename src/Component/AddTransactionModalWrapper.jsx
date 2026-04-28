// AddTransactionModalWrapper.jsx
import React from "react";
import AddTransactionModal from "./AddTransactionModal";
import { useTransactions } from "../Context/TransactionContext";

const AddTransactionModalWrapper = () => {
  const { isModalOpen, setIsModalOpen, addTransaction, categories, editData, setEditData } = useTransactions();

  return (
    <AddTransactionModal
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false);
        setEditData(null);
      }}
      addTransaction={addTransaction}
      categories={categories}
      editData={editData}
    />
  );
};

export default AddTransactionModalWrapper;