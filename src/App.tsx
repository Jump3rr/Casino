import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './tools/store';
import { NavBar } from './components/NavBar/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Login/RegisterPage';
import { auth } from './tools/firebaseConfig';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<NavBar />} />
          </Route>
          <Route path='/Login' element={<LoginPage />} />
          <Route path='/Register' element={<RegisterPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
