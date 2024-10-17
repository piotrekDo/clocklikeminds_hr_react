import { Box, keyframes, Text } from '@chakra-ui/react';
import { EmployeePosition } from '../../../model/User';

interface Props {
  position: EmployeePosition;
}

export const EmployeeCardPosition = ({ position }: Props) => {
  const maxDisplayLength = 22;
  const postitionNameLength = (position && position.displayName.length) || 0;

  const rightThenLeft = keyframes`
  0% { left: 0; }
  50% { left: -55%; }
  100% { left: 0; }
`;

  if (postitionNameLength <= maxDisplayLength) {
    return (
      <Text h={'35px'} w={'100%'}>
        {position && position.displayName}
      </Text>
    );
  } else
    return (
      <Box w={'200%'} h={'35px'} pos={'relative'}>
        <Box
          pos={'absolute'}
          w={`${postitionNameLength}ch`}
          textAlign={'left'}
          animation={`${rightThenLeft} 5s linear infinite`}
        >
          {position.displayName}
        </Box>
      </Box>
    );
};
