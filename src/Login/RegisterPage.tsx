import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../tools/firebaseConfig'

export const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
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
      <button onClick={register}>Register</button>
    </>
  )
}

export default RegisterPage
