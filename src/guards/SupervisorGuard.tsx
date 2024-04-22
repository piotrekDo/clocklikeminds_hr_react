import React from 'react';
import useAuthentication from '../state/useAuthentication';
import { Navigate } from 'react-router-dom';

export const SupervisorGuard = ({ children }: React.PropsWithChildren) => {
  const isAdmin = useAuthentication(s => s.isAdmin);
  const isSupervisor = useAuthentication(s => s.isSupervisor);
  
  if (!isAdmin && !isSupervisor) {
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
};
