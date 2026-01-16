import React, { useEffect, useState } from "react";
import useAccountStore from "../store/accountStore.js";
import Navbar from "../components/Navbar.jsx";
import AddAccountModal from "../components/AddAccountModal.jsx";
import AddMoneyModal from "../components/AddMoneyModal.jsx";
import ViewAccountModal from "../components/ViewAccountModal.jsx";
import TransferMoneyModal from "../components/TransferMoneyModal.jsx";

const Accounts = () => {
  const { accounts, fetchAccounts, loading, error } = useAccountStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleAddMoneyClick = (id) => {
    setSelectedAccountId(id);
    setIsAddMoneyOpen(true);
    setActiveMenuId(null);
  };



  const getAccountIcon = (name) => {
    if (name?.toLowerCase().includes('paypal')) return (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.076 21.337l.848-5.39H4.97C3.11 15.947 2 14.82 2 12.668c0-3.328 2.45-6.611 6.953-6.611 3.535 0 5.432 1.832 5.432 4.453 0 2.21-1.025 5-4.822 5h-1.556l-.88 5.827h-.05zM12.924 2.663h-6c-3.13 0-5.38 2.05-5.38 4.75 0 2.87 1.95 5.58 5.34 5.58h.9l.06 6h3.45l.34-4.5c2.32-.23 4.37-2.15 4.37-5.26.01-3.66-2.5-6.57-7.08-6.57z" /></svg>
    );
    if (name?.toLowerCase().includes('crypto') || name?.toLowerCase().includes('bitcoin')) return (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 10.5c.3-2.3-1.4-3.5-3.8-4.3l.8-3.2-1.9-.5-.8 3.1c-.5-.1-1-.3-1.5-.4l.8-3.1-2-.5-.8 3.2c-.4-.1-.8-.2-1.2-.3l-.2-.8-2.6.7s.7.2.7.2c.4.1.5.4.3.9l-3 12c-.1.3-.3.4-.6.3 0 0-.7-.2-.7-.2l-1.8.8.8 3.3c.5.1 1 .3 1.5.4l-.8 3.2 2 .5.8-3.2c.5.1 1 .2 1.5.4l-.8 3.2 2 .5.8-3.2c3.2.6 5.6.3 6.6-2.5.8-2.3 0-3.6-1.7-4.5.6-.4 1-1.6.9-3.2zm-1.8 7.3c-.3 1.1-2.1 4.5-5.3 3.6l.9-3.8c3.2.8 4.7-1.1 4.4-2.2-.2-1.1-2-1.7-3.9-1.3l.9-3.7c1.9-.4 4.3.1 3 2.4z" /></svg>
    );
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    );
  }

  const handleViewAccount = (account) => {
    setSelectedAccount(account);
    setIsViewModalOpen(true);
    setActiveMenuId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />

      <AddAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <AddMoneyModal isOpen={isAddMoneyOpen} onClose={() => setIsAddMoneyOpen(false)} accountId={selectedAccountId} />
      <ViewAccountModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} account={selectedAccount} />
      <TransferMoneyModal isOpen={isTransferModalOpen} onClose={() => setIsTransferModalOpen(false)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Accounts Information</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setIsTransferModalOpen(true)}
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              Transfer
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg shadow-gray-200 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Add
            </button>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading && !error && accounts.length > 0 ? (
            accounts.map((acc, index) => (
              <div key={acc.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-colors relative group">

                <div className="flex justify-between items-start mb-6 relative">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-700">
                    {getAccountIcon(acc.account_name)}
                  </div>
                  <button
                    onClick={() => setActiveMenuId(activeMenuId === acc.id ? null : acc.id)}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                  </button>

                  {/* Menu Dropdown */}
                  {activeMenuId === acc.id && (
                    <div className="absolute right-0 top-10 w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-10 py-1 overflow-hidden animate-in fade-in zoom-in duration-200">
                      <button
                        onClick={() => handleViewAccount(acc)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        View Details
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{acc.account_name}</h3>
                  <p className="text-xs text-gray-500 mb-6 font-mono tracking-wider">
                    {acc.account_number ? `•••• ${acc.account_number.slice(-4)}` : "•••• 5678"}
                  </p>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-1">Balance</p>
                      <h2 className="text-2xl font-semibold text-gray-900">₹{parseFloat(acc.account_balance).toLocaleString()}</h2>
                    </div>
                    <button
                      onClick={() => handleAddMoneyClick(acc.id)}
                      className="bg-black text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

              </div>
            ))
          ) : (
            !loading && (
              <div className="col-span-full py-12 text-center text-gray-400">
                <p>No accounts found. Click "Add" to create one.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
