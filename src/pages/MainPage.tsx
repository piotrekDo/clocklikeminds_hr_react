import { Navigate } from 'react-router-dom';
import useAuthentication from '../state/useAuthentication';
import { SupervisorDashboard } from './SupervisorDashboard';
import { EmployeeDashboard } from './EmployeeDashboard';

export const MainPage = () => {
  const isSupervisor = useAuthentication(s => s.isSupervisor);
  const isAdmin = useAuthentication(s => s.isAdmin);

  return (
    <>
      {isAdmin || isSupervisor ? (
        <SupervisorDashboard />
      ) : (
        <EmployeeDashboard />
      )}
    </>
  );
};
