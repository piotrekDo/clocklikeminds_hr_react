import { useQuery } from '@tanstack/react-query';
import { RequestsForUserCalendar } from '../model/Pto';
import { fetchRequestsForuserCalendar } from '../service/TimeOffHttpService';

const useRequestsForUserCalendar = (year: number) => {
  return useQuery<RequestsForUserCalendar, Error>({
    queryKey: ['requestsForUserCalendadr', year],
    queryFn: ({ signal }) => fetchRequestsForuserCalendar(year, signal),
  });
};

export default useRequestsForUserCalendar