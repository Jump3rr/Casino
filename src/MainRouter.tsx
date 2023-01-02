import React, { useEffect } from 'react';
import store from './tools/store';
import { NavBar } from './components/NavBar/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Login/RegisterPage';
import PrivateRoute from './PrivateRoute';
import { ProfileComponent } from './components/Profile/Profile';
import { MainPage } from './components/MainPage/MainPage';
import Blackjack from './components/Games/Blackjack/Blackjack';
import Roulette from './components/Games/Roulette/Roulette';
import { HiLo } from './components/Games/Hi-Lo/HiLo';
import { Machine } from './components/Games/SlotsMachine/machine';
import { useDispatch } from 'react-redux';
import { getFbCredits } from './actions/creditsFbActions';
import { auth } from './tools/firebaseConfig';

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;

type GetFbCredits = ReturnType<typeof getFbCredits>;
function MainRouter() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch<GetFbCredits>(getFbCredits());
    //dispatch(getFbCredits());
  }, [dispatch, auth.currentUser]);

  return (
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
          <Route path='/slots' element={<Machine />} />
        </Route>
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/Register' element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default MainRouter;
