import { Button, HStack } from '@chakra-ui/react';
import React from 'react';
import { EmployeeDetailsPage } from './EmployeeDetails';

interface Props {
  selectedPage: EmployeeDetailsPage;
  setSelectedPage: (selectedPage: EmployeeDetailsPage) => void;
}

export const EmployeeDetailsPageSelect = ({ selectedPage, setSelectedPage }: Props) => {
  return (
    <HStack w={'100%'} mt={3} justifyContent={'center'}>
      <Button onClick={() => setSelectedPage('profile')}>Profil</Button>
      <Button onClick={() => setSelectedPage('2')}>Coś</Button>
      <Button onClick={() => setSelectedPage('3')}>Coś2</Button>
    </HStack>
  );
};
