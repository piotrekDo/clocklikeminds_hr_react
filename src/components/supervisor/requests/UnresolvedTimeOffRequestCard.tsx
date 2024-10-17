import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { PtoRequestFormatted } from '../../../model/Pto';
import { TimeOffRequestCardBack } from './TimeOffRequestCardBack';
import { TimeOffRequestCardFront } from './TimeOffRequestCardFront';

interface Props {
  request: PtoRequestFormatted;
}

export const UnresolvedTimeOffRequestCard = ({ request }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Box w={'300px'} h={'400px'} cursor={'pointer'} onClick={handleFlip} style={{ perspective: '1000px' }}>
      <Box
        w={'100%'}
        h={'100%'}
        position={'relative'}
        transition={'transform 0.6s'}
        transform={isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)'}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <TimeOffRequestCardFront request={request} />
        <TimeOffRequestCardBack request={request} />
      </Box>
    </Box>
  );
};
