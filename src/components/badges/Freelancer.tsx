import { Box, Tooltip } from '@chakra-ui/react';
import { SiFreelancer } from 'react-icons/si';

interface Props {
    size: string
}

export const Freelancer = ({size}: Props) => {
  return (
    <Tooltip label='Freelancer'>
      <Box>
        <SiFreelancer size={size}/>
      </Box>
    </Tooltip>
  );
};
