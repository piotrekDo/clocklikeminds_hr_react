import useUrlQuery from '../hooks/useUrlQuery';
import { Navigate } from 'react-router-dom';
import useAuthentication from '../state/useAuthentication';
import { jwtDecode } from 'jwt-decode';
import { AppUser, TokenPayload } from '../model/User';

export const Redirecthandler = () => {
  const setUser = useAuthentication(s => s.setUserData);
  const query = useUrlQuery();
  const token = query.get('token');

  if (token) {
    const tokenPayload: TokenPayload = jwtDecode(token!);
    console.log('exp', tokenPayload.exp)
    console.log('issue', tokenPayload.iat)
    const user: AppUser = {
      userId: tokenPayload.userId,
      userEmail: tokenPayload.sub,
      userRoles: tokenPayload.roles,
      jwtToken: token,
      jwtExpiresAt: tokenPayload.exp,
    };
    setUser(user);
    return <Navigate to={'/home'} />;
  }
  return <Navigate to={'/'} />;
};
