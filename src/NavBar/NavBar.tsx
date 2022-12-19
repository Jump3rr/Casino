import React, { useState } from 'react'
import styled from 'styled-components'
import { app, auth } from '../tools/firebaseConfig'
import { onAuthStateChanged, User } from 'firebase/auth'

const TopBarWrapper = styled.div`
  height: 10vh;
  background-color: blue;
`
export const NavBar = () => {
  const [user, setUser] = useState<User | any>({})

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })
  const logout = async () => {
    await auth.signOut()
  }
  return (
    <>
      <TopBarWrapper>
        <div>Logged as: {auth.currentUser?.email}</div>
        <button onClick={logout}>Log out</button>
      </TopBarWrapper>
    </>
  )
}
