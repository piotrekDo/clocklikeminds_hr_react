import React from 'react';
import { Navigate } from 'react-router-dom';
import { Theme } from '../model/Theme';
import useAuthentication from '../state/useAuthentication';
import useThemeState from '../state/useThemeState';

export const SupervisorGuard = ({ children }: React.PropsWithChildren) => {
  const { appUser, isAdmin, isSupervisor, checkAutologin } = useAuthentication();
  const setTheme = useThemeState(s => s.setTheme);

  if (!appUser) checkAutologin();

  if (!isAdmin && !isSupervisor) {
    const themeName = localStorage.getItem('clocklikeminds_portal_theme') as Theme | undefined;
    setTheme(themeName ? themeName : 'light');
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
};
