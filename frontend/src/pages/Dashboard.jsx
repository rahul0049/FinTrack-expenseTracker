import React from 'react'
import useDashboardStore from '../store/dashboardStore.js'
const Dashboard = () => {
    const {fetchDashboard,loading,availableBalance,totalIncome,totalExpense}=useDashboardStore();
    userEffect(()=>{fetchDashboard();},[]);
    if(loading) return <p>Loading Dashboard ....</p>
  return (
    <div>
      <h2>Dashboard</h2>

      <p>Available Balance: ₹{availableBalance}</p>
      <p>Total Income: ₹{totalIncome}</p>
      <p>Total Expense: ₹{totalExpense}</p>
    </div>
  )
}

export default Dashboard
