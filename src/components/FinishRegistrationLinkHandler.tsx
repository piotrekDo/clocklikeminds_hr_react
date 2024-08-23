import { Navigate, useLocation } from 'react-router-dom';
import useEmployeeState from '../state/useEmployeesState';

export const FinishRegistrationLinkHandler = () => {
  const { setSelectedEmployee, setIsFinisshingRegistration } = useEmployeeState();
  const location = useLocation();
  const params = location.search.substring(1).split('&');
  const mappedParams = new Map<string, string>();
  params.forEach(s => {
    const split = s.split('=');
    mappedParams.set(split[0], split[1]);
  });

  const id = mappedParams.get('empId');
  if (id) {
    setSelectedEmployee(+id);
  }
  return <Navigate to={'/employees'} />;
};
