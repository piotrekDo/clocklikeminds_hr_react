import { Box } from '@chakra-ui/react';
import React from 'react';
import { TimeOff } from './TimeOff';
import { Navigate } from 'react-router-dom';

export const MainPage = () => {
  return (
    <Navigate to={'/timeoff'}/>
    // <Box w={'100%'} h={'100%'}>
    
    // </Box>
  );
};
