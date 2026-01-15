import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import Login from './pages/Login.jsx'
import ProtectedRoute from './routes/ProtectedRoutes.jsx'
import PublicRoute from './routes/PublicRoutes.jsx'
import Dashboard from './pages/dashboard.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to ={token? "/dashboard":"/login"}/>}/>
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path="/dashboard" element = {<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      </Routes>
    </div>
  )
}

export default App
