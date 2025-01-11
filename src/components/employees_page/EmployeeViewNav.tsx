import { VStack, Flex } from '@chakra-ui/react';
import React from 'react';
import { EmployeeDetailsPage } from './EmployeeView';

interface Props {
  selectedView: EmployeeDetailsPage;
  setPage: React.Dispatch<React.SetStateAction<EmployeeDetailsPage>>;
}

export const EmployeeViewNav = ({ selectedView, setPage }: Props) => {
  return (
    <VStack pos={'absolute'} top={'70px'} right={'-80px'} fontSize={'1.1rem'} fontWeight={700} spacing={2}>
      <Flex
        bg='#385898'
        cursor={'pointer'}
        color={selectedView === 'details' ? 'wheat' : ''}
        p={5}
        sx={{
          writingMode: 'vertical-lr',
          textOrientation: 'upright',
        }}
        transform={selectedView === 'details' ? 'translateX(20px)' : ''}
        transitionProperty={'transform color'}
        transitionDuration={'150ms'}
        transitionTimingFunction={'ease-in'}
        onClick={() => setPage('details')}
      >
        DANE
      </Flex>
      <Flex
        bg='#385898'
        cursor={'pointer'}
        p={5}
        color={selectedView === 'requests' ? 'wheat' : ''}
        sx={{
          writingMode: 'vertical-lr',
          textOrientation: 'upright',
        }}
        transform={selectedView === 'requests' ? 'translateX(20px)' : ''}
        transitionProperty={'transform color'}
        transitionDuration={'150ms'}
        transitionTimingFunction={'ease-in'}
        onClick={() => setPage('requests')}
      >
        WNIOSKI
      </Flex>
    </VStack>
  );
};
