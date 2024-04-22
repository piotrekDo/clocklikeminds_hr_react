import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Redirecthandler } from './components/Redirecthandler';
import { Wrapper } from './components/Wrapper';
import { AdminGuard } from './guards/AdminGuard';
import AuthenticatedGuard from './guards/AuthenticatedGuard';
import { SupervisorGuard } from './guards/SupervisorGuard';
import { EmployeesPage } from './pages/EmployeesPage';
import { LoginError } from './pages/LoginError';
import { MainPage } from './pages/MainPage';
import { ProfilePage } from './pages/ProfilePage';
import { SupervisorPage } from './pages/SupervisorPage';
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
      { path: '/supervisor', element: <SupervisorGuard><SupervisorPage /></SupervisorGuard>},
      { path: '/profile', element: <AuthenticatedGuard><ProfilePage /></AuthenticatedGuard> },
      { path: '/employees', element: <AdminGuard><EmployeesPage /></AdminGuard> },
    ],
  },
]);

export default router;
