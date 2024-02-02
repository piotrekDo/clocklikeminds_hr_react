import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Redirecthandler } from './components/Redirecthandler';
import { Wrapper } from './components/Wrapper';
import { LoginError } from './pages/LoginError';
import { MainPage } from './pages/MainPage';
import AuthenticatedGuard from './guards/AuthenticatedGuard';
import { ProfilePage } from './pages/ProfilePage';
import { TimeOff } from './pages/TimeOff';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Wrapper /> },
      { path: '/oauth2/redirect', element: <Redirecthandler /> },
      { path: '/login-failure', element: <LoginError /> },
      { path: '/home', element: <AuthenticatedGuard><MainPage /></AuthenticatedGuard> },
      { path: '/timeoff', element: <AuthenticatedGuard><TimeOff /></AuthenticatedGuard> },
      { path: '/profile', element: <AuthenticatedGuard><ProfilePage /></AuthenticatedGuard> },
    ],
  },
]);

export default router;
