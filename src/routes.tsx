import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Redirecthandler } from './components/Redirecthandler';
import { Wrapper } from './components/Wrapper';
import AuthenticatedGuard from './guards/AuthenticatedGuard';
import { LoginError } from './pages/LoginError';
import { MainPage } from './pages/MainPage';
import { ProfilePage } from './pages/ProfilePage';
import { TimeOff } from './pages/TimeOff';
import { EmployeesPage } from './pages/EmployeesPage';
import { AdminGuard } from './guards/AdminGuard';

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
      { path: '/employees', element: <AdminGuard><EmployeesPage /></AdminGuard> },
    ],
  },
]);

export default router;
