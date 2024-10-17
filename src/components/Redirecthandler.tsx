import { Navigate } from 'react-router-dom';
import useAuthentication from '../state/useAuthentication';
import useThemeState from '../state/useThemeState';
import { Theme } from '../model/Theme';

export const Redirecthandler = () => {
  const setTheme = useThemeState(s => s.setTheme);
  const setUser = useAuthentication(s => s.setUserData);
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (token) {
    setUser(token);
    const themeName = localStorage.getItem('clocklikeminds_portal_theme') as Theme | undefined;
    setTheme(themeName ? themeName : 'light');
    return <Navigate to={'/home'} />;
  }
  return <Navigate to={'/'} />;
};