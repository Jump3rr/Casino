import { User, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from './tools/firebaseConfig';

const PrivateRoute = () => {
  const [user, setUser] = useState<User | any>({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  return user ? <Outlet /> : <Navigate to='/Login' />;
};
export default PrivateRoute;
