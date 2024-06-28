import React from 'react';
import useAuthentication from '../state/useAuthentication';
import { Navigate } from 'react-router-dom';

export const SupervisorGuard = ({ children }: React.PropsWithChildren) => {
  const { appUser, isAdmin, isSupervisor, checkAutologin } = useAuthentication();

  if (!appUser) checkAutologin();

  if (!isAdmin && !isSupervisor) {
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
};
