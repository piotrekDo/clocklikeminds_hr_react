import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { FaRobot } from 'react-icons/fa';
import { GrNotes } from 'react-icons/gr';
import child_care from '../../../assets/child_care_leave.jpeg';
import holiday_summer from '../../../assets/holiday_summer.jpeg';
import occasional_leave from '../../../assets/occasional_leave.jpg';
import on_request_holiday from '../../../assets/pto_on_request.jpg';
import saturday_holiday from '../../../assets/saturday_holiday.jpg';
import { PtoRequestFormatted } from '../../../model/Pto';
import { TimeOffRequestHistory } from '../../timeoff/time_off_request_history/TimeOffRequestHistory';

interface Props {
  request: PtoRequestFormatted;
}
const bg = new Map<string, string>([
  ['pto', holiday_summer],
  ['pto_on_demand', on_request_holiday],
  ['occasional_leave', occasional_leave],
  ['child_care', child_care],
  ['on_saturday_pto', saturday_holiday],
]);
export const TimeOffRequestCardBack = ({ request }: Props) => {
  return (
    <Flex
      pos={'absolute'}
      w={'100%'}
      h={'100%'}
      borderRadius={'20px'}
      overflow={'hidden'}
      boxShadow={'4px 4px 24px 0px rgba(66, 68, 90, 1)'}
      align={'center'}
      justify={'center'}
      fontSize={'2rem'}
      color={'white'}
      transform={'rotateY(180deg)'}
      style={{ backfaceVisibility: 'hidden' }}
      zIndex={100}
    >
      <Box pos={'absolute'} w={'100%'} h={'100%'} bgImage={bg.get(request.leaveType)} bgPos={'center'} opacity={0.25} />
      <VStack
        zIndex={1000}
        p={2}
        w={'100%'}
        h={'100%'}
        align={'start'}
        overflow={'scroll'}
        style={{ scrollbarWidth: 'none', overflow: '-moz-scrollbars-none' }}
      >
        <VStack w={'100%'} align={'start'}>
          <HStack fontSize={'1.2rem'}>
            <FaRobot />
            <Text>Uwagi aplikacji</Text>
          </HStack>
          <Text fontSize={'1rem'} w={'100%'} border={'1px solid'} borderRadius={'5px'} as={'em'} p={1}>
            {request.applicationNotes ? request.applicationNotes : 'BRAK UWAG APLIKACJI'}
          </Text>
        </VStack>
        <VStack w={'100%'} align={'start'} mt={10}>
          <HStack w={'100%'}>
            <GrNotes fontSize={'1rem'} />
            <Text fontSize={'1.2rem'}>Historia wniosku</Text>
          </HStack>
          <VStack spacing={0}>
            {request.requestHistory.map(history => (
              <TimeOffRequestHistory key={history.historyId} history={history} size='xs' />
            ))}
          </VStack>
        </VStack>
      </VStack>
    </Flex>
  );
};
