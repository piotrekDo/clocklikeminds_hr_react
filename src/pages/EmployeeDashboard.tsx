import React from 'react'
import { Navigate } from 'react-router-dom'

export const EmployeeDashboard = () => {
  return (
     <Navigate to={'/timeoff'} replace />
  )
}
