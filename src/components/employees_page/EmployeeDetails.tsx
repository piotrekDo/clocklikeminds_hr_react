import { Box, Spinner, VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import useEmployeeDetails from '../../hooks/useEmployeeDetails';
import useEmployeeState from '../../state/useEmployeesState';
import useHttpErrorState from '../../state/useHttpErrorState';
import { EmployeeAccountInfo } from './EmployeeAccountInfo';
import { EmployeeContractinformation } from './EmployeeContractinformation';
import { EmployeeDetailsHeading } from './EmployeeDetailsHeading';
import { EmployeeGeneralInformation } from './EmployeeGeneralInformation';
import { EmployeeHistory } from './EmployeeHistory';
import { RegistrationFinishModal } from './RegistrationFinishModal';
import { EmployeeTimeOffDetails } from './EmployeeTimeOffDetails';

export type EmployeeDetailsPage = 'profile' | '2' | '3';

export const EmployeeDetails = () => {
  const { selectedEmloyee, isFinishingRegistration, setIsFinisshingRegistration } = useEmployeeState();
  const setError = useHttpErrorState(s => s.setError);
  const { data: employee, isError, error, isFetching } = useEmployeeDetails(selectedEmloyee || -1);

  useEffect(() => {
    isError && setError(error);
  }, [isError]);

  return (
    <>
      <VStack w={'100%'} h={'100%'} overflowY={'scroll'}>
        {isFetching && <Spinner size={'xl'} />}
        {!isFetching && employee && (
          <>
            <AnimatePresence>
              <motion.div
                initial={{ y: '+100px', opacity: 0 }}
                animate={{ y: '0', opacity: 1 }}
                exit={{ y: '+100px', opacity: 0 }}
              >
                <Box mt={'20px'}>
                  <EmployeeDetailsHeading employee={employee} />
                </Box>
                <VStack opacity={employee.registrationFinished ? 1 : .4} position={'relative'}>
                  {!employee.registrationFinished && <Box position={'absolute'} left={0} top={0} w={'100%'} h={'100%'} zIndex={10}></Box>}
                  <Box w={'90%'} mt={'70px'}>
                    <EmployeeGeneralInformation employee={employee} />
                  </Box>
                  <Box w={'90%'} mt={'100px'}>
                    <EmployeeContractinformation employee={employee} />
                  </Box>
                  <Box w={'90%'} mt={'100px'}>
                    <EmployeeTimeOffDetails employee={employee} />
                  </Box>
                  <Box w={'90%'} mt={'100px'}>
                    <EmployeeHistory employee={employee} />
                  </Box>
                  <Box w={'90%'} my={'100px'}>
                    <EmployeeAccountInfo employee={employee} />
                  </Box>
                </VStack>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </VStack>

      <RegistrationFinishModal isOpen={isFinishingRegistration} onClose={setIsFinisshingRegistration} />
    </>
  );
};
