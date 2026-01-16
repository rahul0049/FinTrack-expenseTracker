import { useEffect, useState } from "react";
import useDashboardStore from "../store/dashboardStore.js";
import IncomeExpenseChart from "../components/IncomeExpenseChart.jsx";
import SummaryChart from "../components/SummaryChart.jsx";
import Navbar from "../components/Navbar.jsx";
import AddAccountModal from "../components/AddAccountModal.jsx";

const Dashboard = () => {
  const {
    fetchDashboard,
    loading,
    error,
    availableBalance,
    totalIncome,
    totalExpense,
    chartData,
    lastTransactions,
    lastAccounts,
  } = useDashboardStore();

  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading && !availableBalance && !totalIncome && !totalExpense) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-red-600 font-medium">
      Error: {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Monitor your financial activities</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Total Balance */}
          {/* Total Balance */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Total Balance</p>
              <h3 className="text-2xl font-bold text-gray-900">₹{availableBalance.toLocaleString()}</h3>
            </div>
            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>

          {/* Total Income */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Income</p>
              <h3 className="text-2xl font-bold text-gray-900">₹{totalIncome.toLocaleString()}</h3>
            </div>
            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
            </div>
          </div>

          {/* Total Expense */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Expense</p>
              <h3 className="text-2xl font-bold text-gray-900">₹{totalExpense.toLocaleString()}</h3>
            </div>
            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
          </div>

        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <IncomeExpenseChart data={chartData} />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <SummaryChart income={totalIncome} expense={totalExpense} />
          </div>
        </div>

        {/* Bottom Section: Transactions & Accounts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Latest Transactions */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Latest Transactions</h3>
              <a href="/transactions" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">View All</a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-100">
                    <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Source</th>
                    <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {lastTransactions && lastTransactions.length > 0 ? (
                    lastTransactions.map((tx) => (
                      <tr key={tx.id || Math.random()} className="group hover:bg-gray-50 transition-colors">
                        <td className="py-4 text-sm text-gray-600">
                          {new Date(tx.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                        <td className="py-4 text-sm font-medium text-gray-900">{tx.description}</td>
                        <td className="py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <svg className="mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                              <circle cx="4" cy="4" r="3" />
                            </svg>
                            Completed
                          </span>
                        </td>
                        <td className="py-4 text-sm text-gray-500">{tx.source || "Cash"}</td>
                        <td className={`py-4 text-sm font-bold text-right ${tx.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
                          {tx.type === 'expense' ? '-' : '+'} ₹{parseFloat(tx.amount).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-400 text-sm">No recent transactions</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Accounts */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Accounts</h3>
              <a href="/accounts" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">View All</a>
            </div>

            <div className="space-y-4">
              {lastAccounts && lastAccounts.length > 0 ? (
                lastAccounts.map((acc, index) => (
                  <div key={acc.id || index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-700">
                        <span className="font-bold text-sm">{acc.account_name?.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{acc.account_name}</p>
                        <p className="text-xs text-gray-500">{acc.account_number ? `**** ${acc.account_number.slice(-4)}` : "********1234"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">₹{parseFloat(acc.account_balance).toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Balance</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-400 text-sm">No accounts found</div>
              )}

              {/* Add Account Button Placeholder */}
              <button
                onClick={() => setIsAddAccountModalOpen(true)}
                className="w-full mt-4 py-2 border-2 border-dashed border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                Add New Account
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Add Account Modal */}
      <AddAccountModal
        isOpen={isAddAccountModalOpen}
        onClose={() => {
          setIsAddAccountModalOpen(false);
          fetchDashboard(); // Refresh data after adding account
        }}
      />
    </div>
  );
};

export default Dashboard;
