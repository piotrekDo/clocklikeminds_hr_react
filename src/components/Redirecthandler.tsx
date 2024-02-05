import { Navigate } from 'react-router-dom';
import useCookies from '../hooks/useCookies';
import useAuthentication from '../state/useAuthentication';

export const Redirecthandler = () => {
  const setUser = useAuthentication(s => s.setUserData);
  const cookies = useCookies();
  const token = cookies['token'];
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

  if (token) {
    setUser(token);
    return <Navigate to={'/home'} />;
  }
  return <Navigate to={'/'} />;
};
