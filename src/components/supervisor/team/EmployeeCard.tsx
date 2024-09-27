import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { EmployeeInfo } from '../../../model/User';
import { EmployeeCardBack } from './EmployeeCardBack';
import { EmployeeCardFront } from './EmployeeCardFront';

interface Props {
  employee: EmployeeInfo;
}

export const EmployeeCard = ({ employee }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Box w={'250px'} h={'350px'} cursor={'pointer'} onClick={handleFlip} style={{ perspective: '1000px' }}>
      <Box
        w={'100%'}
        h={'100%'}
        position={'relative'}
        transition={'transform 0.6s'}
        transform={isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)'}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <EmployeeCardFront employee={employee} />
        <EmployeeCardBack employee={employee} />
      </Box>
    </Box>
  );
};
