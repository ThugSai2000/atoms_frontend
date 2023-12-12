import React from 'react'
import { Navigate } from 'react-router-dom'
import MainLayout from '../Layout/MainLayout'



const PrivateRoutes = () =>
{


  const z = localStorage.getItem("Authorization")
  // console.log("private route : " + z)

  let auth = { "token": z !== null || undefined ? true : false }
  return (
    auth.token ? <MainLayout /> : <Navigate to="/login" />
  )
}

export default PrivateRoutes
