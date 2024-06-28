import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthentication from '../state/useAuthentication';

export const AdminGuard = ({ children }: React.PropsWithChildren) => {
  const { appUser, isAdmin, checkAutologin } = useAuthentication();

  if (!appUser) checkAutologin();

  if (!isAdmin) {
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
};
