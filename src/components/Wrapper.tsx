import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import useAuthentication from '../state/useAuthentication';

export const Wrapper = () => {
  const { appUser, checkAutologin } = useAuthentication();
  console.log('hello wrapper')

  useEffect(() => {
    checkAutologin();
  }, []);

  if (appUser) {
    return <Navigate to={'/home'} />;
  }
  return <LoginPage />;
};
