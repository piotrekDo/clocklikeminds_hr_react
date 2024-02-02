import useUrlQuery from '../hooks/useUrlQuery';
import { Navigate } from 'react-router-dom';
import { AuthenticationResponse } from '../model/User';
import useAuthentication from '../state/useAuthentication';
import useCookies from '../hooks/useCookies';

export const Redirecthandler = () => {
  const cookies = useCookies();
  const setUser = useAuthentication(s => s.setUserData);
  const query = useUrlQuery();
  // const token = query.get('token');
  // const userId = query.get('userId');
  // const mail = query.get('mail');
  // const firstName = query.get('firstName');
  // const lastName = query.get('lastName');
  // const expireTimestamp = query.get('expireTimestamp');
  // const jwtExpiresAt = query.get('jwtExpiresAt');
  // const userRoles = query.get('userRoles')?.split(',');

  // const authenticatedUser: AuthenticationResponse = {
  //   userId: +userId!,
  //   userEmail: mail!,
  //   firstName: firstName!,
  //   lastName: lastName!,
  //   userRoles: userRoles!,
  //   jwtToken: token!,
  //   jwtExpiresAt: jwtExpiresAt!,
  //   jwtExpiresAtTimestamp: +expireTimestamp!,
  // };

  const authCookie = cookies['appUser'].split('/:/');

  const authenticatedUser: AuthenticationResponse = {
    userId: +authCookie[0],
    userEmail: authCookie[1],
    firstName: authCookie[2],
    lastName: authCookie[3],
    userRoles: authCookie[4].split('/'),
    jwtToken: authCookie[5],
    jwtExpiresAt: authCookie[6],
    jwtExpiresAtTimestamp: +authCookie[7],
  };

  console.log(authenticatedUser);

  if (authenticatedUser.jwtToken) {
    setUser(authenticatedUser);
    return <Navigate to={'/home'} />;
  }
  return <Navigate to={'/'} />;
};
