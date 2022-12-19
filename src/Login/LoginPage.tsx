import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../tools/firebaseConfig'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      console.log(user)
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
    </>
  )
}

export default LoginPage
