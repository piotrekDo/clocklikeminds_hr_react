import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Theme } from '../model/Theme';
import { LoginPage } from '../pages/LoginPage';
import useAuthentication from '../state/useAuthentication';
import useThemeState from '../state/useThemeState';

export const Wrapper = () => {
  const { appUser, checkAutologin } = useAuthentication();
  const setTheme = useThemeState(s => s.setTheme);

  useEffect(() => {
    checkAutologin();
    const themeName = localStorage.getItem('clocklikeminds_portal_theme') as Theme | undefined;
    setTheme(themeName ? themeName : 'light');
  }, []);

  if (appUser) {
    return <Navigate to={'/home'} />;
  }
  return <LoginPage />;
};
