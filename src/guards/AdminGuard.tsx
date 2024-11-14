import React from 'react';
import { Navigate } from 'react-router-dom';
import { Theme } from '../model/Theme';
import useAuthentication from '../state/useAuthentication';
import useThemeState from '../state/useThemeState';

export const AdminGuard = ({ children }: React.PropsWithChildren) => {
  const { appUser, isAdmin, checkAutologin } = useAuthentication();
  const setTheme = useThemeState(s => s.setTheme);

  if (!appUser) {
    checkAutologin();
    const themeName = localStorage.getItem('clocklikeminds_portal_theme') as Theme | undefined;
    setTheme(themeName ? themeName : 'light');
  }

  if (!isAdmin) {
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
};
