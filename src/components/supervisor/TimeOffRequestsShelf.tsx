import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { PtoRequestFormatted } from '../../model/Pto';
import { UnresolvedTimeOffRequestCard } from './requests/UnresolvedTimeOffRequestCard';

interface Props {
  requests: PtoRequestFormatted[];
  title: string;
}

export const TimeOffRequestsShelf = ({ requests, title }: Props) => {
  const [isCollasped, setIsCollapsed] = useState(requests.length === 0);
  const [isExpandedd, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    setIsCollapsed(requests.length === 0);
  }, [requests.length]);

  return (
    <VStack
      borderRadius={'20px'}
      bg={'linear-gradient(145deg, rgba(55,87,144,1) 18%, rgba(10,110,145,1) 84%)'}
      boxShadow={'8px 8px 24px 2px rgba(60, 70, 90, 1)'}
      w={'100%'}
      h={isCollasped ? '3rem' : ''}
      overflow={'hidden'}
    >
      <HStack w={'100%'} justify={'space-between'} px={5}>
        <Text
          fontSize={'2rem'}
          textShadow='
            1px 1px 0 rgba(0, 0, 0, 0.3),  
            2px 2px 0 rgba(0, 0, 0, 0.3), 
            3px 3px 4px rgba(0, 0, 0, 0.5)'
          color={'whiteAlpha.800'}
          fontWeight={'700'}
          w={'100%'}
          cursor={'pointer'}
          onClick={e => {
            if (requests.length === 0) return;
            setIsCollapsed(s => !s);
          }}
        >
          {title} : {requests.length}
        </Text>
        <Box>
          <Button onClick={e => setIsExpanded(s => !s)}>Pokaż wszystkie</Button>
        </Box>
      </HStack>
      <HStack
        w={'100%'}
        flexWrap={'wrap'}
        spacing={5}
        px={2}
        py={5}
        h={!isExpandedd ? '440px' : ''}
        overflow={'hidden'}
      >
        {requests.map(r => (
          <UnresolvedTimeOffRequestCard key={r.id} request={r} />
        ))}
      </HStack>
    </VStack>
  );
};
