import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../tools/firebaseConfig'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      console.log(user)
      navigate('/')
    } catch (error: any) {
      console.log(error.message)
    }
  }
  return (
    <>
      <input
        type="text"
        placeholder="Email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={login}>Login</button>
      <div>logged as : {auth.currentUser?.email}</div>
    </>
  )
}

export default LoginPage
