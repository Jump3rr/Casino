import React from 'react'
import { Provider } from 'react-redux'
import store from './tools/store'
import { NavBar } from './NavBar/NavBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './Login/LoginPage'
import RegisterPage from './Login/RegisterPage'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<NavBar />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
        </Routes>
      </Router>
      <NavBar />
    </Provider>
  )
}

export default App
