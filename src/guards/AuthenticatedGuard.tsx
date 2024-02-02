import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthentication from '../state/useAuthentication';

export const AuthenticatedGuard = ({ children }: React.PropsWithChildren) => {
  const { appUser } = useAuthentication();


  if (!appUser) {
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
};


export default AuthenticatedGuard;
