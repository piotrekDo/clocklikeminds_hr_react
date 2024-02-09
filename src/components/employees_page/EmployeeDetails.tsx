import { Box, Spinner, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useEmployeeDetails from '../../hooks/useEmployeeDetails';
import useEmployeeState from '../../state/useEmployeesState';
import { EmployeeAccountInfo } from './EmployeeAccountInfo';
import { EmployeeContractinformation } from './EmployeeContractinformation';
import { EmployeeDetailsHeading } from './EmployeeDetailsHeading';
import { EmployeeGeneralInformation } from './EmployeeGeneralInformation';
import { EmployeeHistory } from './EmployeeHistory';
import { AnimatePresence, motion } from 'framer-motion';

export type EmployeeDetailsPage = 'profile' | '2' | '3';

export const EmployeeDetails = () => {
  const { selectedEmloyee } = useEmployeeState();
  const { data: employee, isError, isFetching } = useEmployeeDetails(selectedEmloyee || -1);
  const [selectedPage, setSelectedPage] = useState<EmployeeDetailsPage>('profile');

useEffect(() => {
  console.log(employee)
}, [employee]);

  return (
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
              <Box w={'90%'} mt={'70px'}>
                <EmployeeGeneralInformation employee={employee} />
              </Box>
              <Box w={'90%'} mt={'100px'}>
                <EmployeeContractinformation employee={employee} />
              </Box>
              <Box w={'90%'} mt={'100px'}>
                <EmployeeHistory employee={employee} />
              </Box>
              <Box w={'90%'} my={'100px'}>
                <EmployeeAccountInfo employee={employee} />
              </Box>
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </VStack>
  );
};
