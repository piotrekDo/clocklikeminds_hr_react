import React from 'react';
import { Navigate } from 'react-router-dom';
import { Theme } from '../model/Theme';
import useAuthentication from '../state/useAuthentication';
import useThemeState from '../state/useThemeState';

export const AuthenticatedGuard = ({ children }: React.PropsWithChildren) => {
  const { appUser } = useAuthentication();
  const setTheme = useThemeState(s => s.setTheme);

  if (!appUser) {
    const themeName = localStorage.getItem('clocklikeminds_portal_theme') as Theme | undefined;
    setTheme(themeName ? themeName : 'light');
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
};

export default AuthenticatedGuard;
