import { Box, VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useEmployeeDetails from '../../hooks/useEmployeeDetails';
import useEmployeeState from '../../state/useEmployeesState';
import useHttpErrorState from '../../state/useHttpErrorState';
import { EmployeeDetails } from './details/EmployeeDetails';
import { EmployeeDetailsHeading } from './details/EmployeeDetailsHeading';
import { RegistrationFinishModal } from './details/RegistrationFinishModal';
import { EmployeeViewNav } from './EmployeeViewNav';
import { EmployeeTimeOffRequests } from './requests/EmployeeTimeOffRequests';

export type EmployeeDetailsPage = 'details' | 'requests';

export const EmployeeView = () => {
  const { selectedEmloyee, isFinishingRegistration, setIsFinisshingRegistration } = useEmployeeState();
  const setError = useHttpErrorState(s => s.setError);
  const {
    data: employee,
    isError,
    error,
    isFetching: isFetchingEmployeeDetails,
  } = useEmployeeDetails(selectedEmloyee || -1);
  const [page, setPage] = useState<EmployeeDetailsPage>('details');

  useEffect(() => {
    isError && setError(error);
  }, [isError]);

  return (
    <>
      <VStack w={'100%'} h={'100%'}>
        <AnimatePresence>
          <motion.div
            initial={{ y: '+100px', opacity: 0 }}
            animate={{ y: '0', opacity: 1 }}
            exit={{ y: '+100px', opacity: 0 }}
          >
            <Box
              position={'relative'}
              mt={'20px'}
              bg='#385898'
              color={'whiteAlpha.900'}
              p={3}
              boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}
              borderRadius={'20px 20px 0 0'}
            >
              <EmployeeDetailsHeading employee={employee} />
              <EmployeeViewNav selectedView={page} setPage={setPage} />
            </Box>
            {page === 'details' && <EmployeeDetails employee={employee} isFetching={isFetchingEmployeeDetails} />}
            {page === 'requests' && <EmployeeTimeOffRequests selectedUser={employee?.appUserId || -1} />}
          </motion.div>
        </AnimatePresence>
      </VStack>

      <RegistrationFinishModal isOpen={isFinishingRegistration} onClose={setIsFinisshingRegistration} />
    </>
  );
};
