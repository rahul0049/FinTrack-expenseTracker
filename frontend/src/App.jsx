import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import ProtectedRoute from './routes/ProtectedRoutes.jsx'
import PublicRoute from './routes/PublicRoutes.jsx'
import Dashboard from './pages/Dashboard.jsx'
import useAuthStore from './store/authStore.js'
import Register from './pages/Register.jsx'
import Accounts from './pages/Accounts.jsx'
import Transactions from './pages/Transactions.jsx'
import Settings from './pages/Settings.jsx'

import { Toaster } from "react-hot-toast";

const App = () => {
  const token = useAuthStore((state) => state.token)
  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            zIndex: 99999,
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/logout" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
        <Route path="/accounts" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
