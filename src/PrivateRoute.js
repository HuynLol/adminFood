import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated)
  const username = localStorage.getItem('username')

  return isAuthenticated || username ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
