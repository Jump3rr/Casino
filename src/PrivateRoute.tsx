import { User, onAuthStateChanged } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import {
  Route,
  redirect,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom'
import { NavBar } from './NavBar/NavBar'
import { auth } from './tools/firebaseConfig'

const PrivateRoute = () => {
  const [user, setUser] = useState<User | any>({})

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })
  return user ? <Outlet /> : <Navigate to="/Login" />
}
export default PrivateRoute
