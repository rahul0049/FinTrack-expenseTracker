import React, { useState } from "react";
import useAccountStore from "../store/accountStore";
import toast from "react-hot-toast";

const TransferMoneyModal = ({ isOpen, onClose }) => {
    const { accounts, transferMoney, loading } = useAccountStore();
    const [fromAccount, setFromAccount] = useState("");
    const [toAccount, setToAccount] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fromAccount || !toAccount || !amount) {
            toast.error("Please fill all fields");
            return;
        }
        if (fromAccount === toAccount) {
            toast.error("Cannot transfer to the same account");
            return;
        }
        if (parseFloat(amount) <= 0) {
            toast.error("Amount must be greater than 0");
            return;
        }

        try {
            await transferMoney({
                from_account: fromAccount,
                to_account: toAccount,
                amount: parseFloat(amount),
            });
            toast.success("Transfer successful");
            onClose();
            setFromAccount("");
            setToAccount("");
            setAmount("");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Transfer failed");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 transform transition-all scale-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Transfer Money</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">From Account</label>
                        <select
                            value={fromAccount}
                            onChange={(e) => setFromAccount(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                        >
                            <option value="">Select Account</option>
                            {accounts.map((acc) => (
                                <option key={acc.id} value={acc.id}>
                                    {acc.account_name} (₹{parseFloat(acc.account_balance).toLocaleString()})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">To Account</label>
                        <select
                            value={toAccount}
                            onChange={(e) => setToAccount(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                        >
                            <option value="">Select Account</option>
                            {accounts.map((acc) => (
                                <option key={acc.id} value={acc.id}>
                                    {acc.account_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? "Processing..." : "Transfer"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TransferMoneyModal;
