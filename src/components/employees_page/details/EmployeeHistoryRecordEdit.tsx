import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Employee, EmployeePositionHistory } from '../../../model/User';

interface Props {
  empployee: Employee;
  position: EmployeePositionHistory;
  setEditedPosHistory: React.Dispatch<React.SetStateAction<EmployeePositionHistory[]>>;
}

const getInput = (date: string) => {
  const parsedDate = new Date(date);
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const EmployeeHistoryRecordEdit = ({ empployee, position, setEditedPosHistory }: Props) => {
  const [isRemoved, setIsRemmoved] = useState(false);

  const handleRemoved = () => {
    setIsRemmoved(s => !s);
    if (!isRemoved) {
      setEditedPosHistory(his => {
        his.filter(x => x.positionHistoryId === position.positionHistoryId)[0].startDate = undefined;
        return his;
      });
    } else {
      setEditedPosHistory(his => {
        const oldStartDate = empployee.positionHistory.filter(
          p => p.positionHistoryId === position.positionHistoryId
        )[0].startDate;
        his.filter(x => x.positionHistoryId === position.positionHistoryId)[0].startDate = oldStartDate;
        return his;
      });
    }
  };

  return (
    <HStack w={'100%'} justifyContent={'start'} alignItems={'center'} opacity={isRemoved ? '.4' : 1}>
      {position.position.positionKey !== empployee.position.positionKey && (
        <Flex justifyContent={'center'} w={'30px'}>
          <DeleteIcon color={'red.400'} cursor={'pointer'} onClick={handleRemoved} />
        </Flex>
      )}
      {position.position.positionKey === empployee.position.positionKey && <Box w={'30px'}></Box>}
      <Input
        disabled={isRemoved}
        type='date'
        size='sm'
        defaultValue={getInput(position.startDate!)}
        maxW={'180px'}
        onChange={e => {
          setEditedPosHistory(his => {
            his.filter(x => x.positionHistoryId === position.positionHistoryId)[0].startDate = e.target.value;
            return his;
          });
        }}
      />
      <Box>{position.position.displayName}</Box>
    </HStack>
  );
};
