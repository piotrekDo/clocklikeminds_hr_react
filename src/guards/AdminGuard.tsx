import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthentication from '../state/useAuthentication';

export const AdminGuard = ({ children }: React.PropsWithChildren) => {
  const isAdmin = useAuthentication(s => s.isAdmin);

  if (!isAdmin) {
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
};
