
import { VStack, HStack, Box } from '@chakra-ui/react'
import { Employee } from '../../model/User'

interface Props {
    employee: Employee
}

export const EmployeeDetailsHireDates = ({employee}: Props) => {
  return (
    <VStack w={'fit-content'} mt={'20px'}>
    <HStack w={'100%'}>
      <Box flexBasis={'100%'}>Data rozpoczęcia pracy:</Box>
      <Box flexBasis={'100%'}>
        {(employee.hireStart &&
          new Date(employee.hireStart).toLocaleString('pl-PL', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })) ||
          'Uzupełnij dane'}
      </Box>
    </HStack>
    <HStack w={'100%'}>
      <Box flexBasis={'100%'}>Data wygaśnięcia umowy: </Box>
      <Box flexBasis={'100%'}>
        {employee.hireStart &&
          employee.hireEnd &&
          new Date(employee.hireEnd).toLocaleString('pl-PL', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
          {employee.hireStart && !employee.hireEnd && 'Umowa na czas nieokreślony'}
          {!employee.hireStart && !employee.hireEnd && 'Uzupełnij dane'}
      </Box>
    </HStack>
  </VStack>
  )
}
