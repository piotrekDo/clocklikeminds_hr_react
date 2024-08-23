import React, { useEffect, useState } from 'react';
import { HolidayOnSaturday, HolidayOnSaturdayByUser, PtoRequestResponse } from '../../../model/Pto';
import { EmployeeBasic } from '../../../model/User';
import { HStack, Select, VStack, Text, Box, Flex } from '@chakra-ui/react';
import { CalendarPageIcon } from '../../general/CalendarPageIcon';
import { CalendarIcon } from '@chakra-ui/icons';

interface Props {
  records: HolidayOnSaturdayByUser[];
}

export const HolidaysOnSaturdayByUsers = ({ records }: Props) => {
  const uniqueHolidays: HolidayOnSaturday[] = records.reduce((acc: HolidayOnSaturday[], curr) => {
    if (!acc.some(holiday => holiday.id === curr.holiday.id)) {
      acc.push(curr.holiday);
    }
    return acc;
  }, []);
  const [selectedHoliday, setSelectedHoliday] = useState<number>();
  const [filteredRecords, setFilteredRecords] = useState<HolidayOnSaturdayByUser[]>([]);

  const handleSelect = (id: number) => {
    setSelectedHoliday(id);
    const filtered = records.filter(r => r.holiday.id === id);
    setFilteredRecords(filtered);
  };

  useEffect(() => {
  }, [filteredRecords]);

  return (
    <VStack w={'100%'}>
      <HStack w={'100%'}>
        <Select w={'300px'} onChange={e => handleSelect(+e.target.value)}>
          <option>Wybierz święto</option>
          {uniqueHolidays.map(holiday => {
            const day = new Date(holiday.date);
            return (
              <option key={holiday.id} value={holiday.id}>
                <Box>
                  <Text>
                    {holiday.date} {holiday.note}
                  </Text>
                </Box>
              </option>
            );
          })}
        </Select>
      </HStack>
      <VStack w={'80%'}>
        {filteredRecords.map((record, index) => {
          const holidayDate = new Date(record.holiday.date);
          return (
            <HStack key={index} border={'solid'} w={'100%'}>
              <HStack flexBasis={'100%'}>
                <CalendarPageIcon date={holidayDate} size='sm' />
                <Text>{record.holiday.note}</Text>
              </HStack>
              <HStack flexBasis={'100%'}>
                <Box
                  w={'30px'}
                  h={'30px'}
                  borderRadius={'30px'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  overflow={'hidden'}
                >
                  <img
                    src={record.employee.imageUrl}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    referrerPolicy='no-referrer'
                  />
                </Box>
                <Text>{record.employee.firstName}</Text>
                <Text>{record.employee.lastName}</Text>
              </HStack>
              <HStack flexBasis={'100%'}>
                    {!record.pto && <Flex><Text>Brak wniosku</Text></Flex>}
                    {record.pto && <Flex><Text>{record.pto.id}</Text></Flex>}
              </HStack>
            </HStack>
          );
        })}
      </VStack>
    </VStack>
  );
};
