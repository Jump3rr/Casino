import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './tools/store';
import { NavBar } from './components/NavBar/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Login/RegisterPage';
import { auth } from './tools/firebaseConfig';
import PrivateRoute from './PrivateRoute';
import { ProfileComponent } from './components/Profile/Profile';
import { MainPage } from './components/MainPage/MainPage';
import Blackjack from './components/Games/Blackjack/Blackjack';
import Roulette from './components/Games/Roulette/Roulette';
import { HiLo } from './components/Games/Hi-Lo/HiLo';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            element={
              <>
                <NavBar />
                <PrivateRoute />
              </>
            }
          >
            <Route path='/' element={<MainPage />} />
            <Route path='/profile' element={<ProfileComponent />} />
            <Route path='/blackjack' element={<Blackjack />} />
            <Route path='/roulette' element={<Roulette />} />
            <Route path='/hilo' element={<HiLo />} />
          </Route>
          <Route path='/Login' element={<LoginPage />} />
          <Route path='/Register' element={<RegisterPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
