import React from "react";

const ViewAccountModal = ({ isOpen, onClose, account }) => {
    if (!isOpen || !account) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 transform transition-all scale-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Account Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Account Name</p>
                        <p className="text-lg font-bold text-gray-900">{account.account_name}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Account Number</p>
                        <p className="text-lg font-mono text-gray-900">{account.account_number}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Current Balance</p>
                        <p className="text-2xl font-bold text-indigo-600">₹{parseFloat(account.account_balance).toLocaleString()}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Created Date</p>
                        <p className="text-sm font-medium text-gray-900">
                            {new Date(account.createdat).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewAccountModal;
