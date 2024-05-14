import { Box, Spinner, VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import useEmployeeDetails from '../../../hooks/useEmployeeDetails';
import useEmployeeState from '../../../state/useEmployeesState';
import useHttpErrorState from '../../../state/useHttpErrorState';
import { EmployeeAccountInfo } from './EmployeeAccountInfo';
import { EmployeeContractinformation } from './EmployeeContractinformation';
import { EmployeeDetailsHeading } from './EmployeeDetailsHeading';
import { EmployeeGeneralInformation } from './EmployeeGeneralInformation';
import { EmployeeHistory } from './EmployeeHistory';
import { EmployeeTimeOffDetails } from './EmployeeTimeOffDetails';
import { RegistrationFinishModal } from './RegistrationFinishModal';

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
      <VStack w={'100%'} h={'100%'}>
        {isFetching && <Spinner size={'xl'} />}
        {!isFetching && employee && (
          <>
            <AnimatePresence>
              <motion.div
                initial={{ y: '+100px', opacity: 0 }}
                animate={{ y: '0', opacity: 1 }}
                exit={{ y: '+100px', opacity: 0 }}
              >
                <Box mt={'20px'} bg='#385898' color={'whiteAlpha.900'} p={3} boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'} borderRadius={'20px 20px 0 0'}>
                  <EmployeeDetailsHeading employee={employee} />
                </Box>
                <VStack
                  maxW={'1000px'}
                  margin={'0 auto'}
                  opacity={employee.registrationFinished ? 1 : 0.4}
                  position={'relative'}
                  gap={'50px'}
                >
                  {!employee.registrationFinished && (
                    <Box position={'absolute'} left={0} top={0} w={'100%'} h={'100%'} zIndex={10}></Box>
                  )}
                  <Box w={'100%'} mt={'20px'}>
                    <EmployeeGeneralInformation employee={employee} />
                  </Box>
                  <Box w={'100%'} >
                    <EmployeeContractinformation employee={employee} />
                  </Box>
                  <Box w={'100%'} >
                    <EmployeeTimeOffDetails employee={employee} />
                  </Box>
                  <Box w={'100%'} >
                    <EmployeeHistory employee={employee} />
                  </Box>
                  <Box w={'100%'} mb={'70px'}>
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
