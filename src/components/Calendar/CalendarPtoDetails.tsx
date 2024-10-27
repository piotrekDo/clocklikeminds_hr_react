import { CloseIcon } from '@chakra-ui/icons';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import holiday_summer from '../../assets/holiday_summer.jpeg';
import on_request_holiday from '../../assets/pto_on_request.jpg';
import saturday_holiday from '../../assets/saturday_holiday.jpg';
import occasional_leave from '../../assets/occasional_leave.jpg';
import child_care from '../../assets/child_care_leave.jpeg';
import { PtoRequestFormatted } from '../../model/Pto';
import { useEffect, useState } from 'react';
import { GrNotes } from 'react-icons/gr';
import { TimeOffRequestHistory } from '../timeoff/time_off_request_history/TimeOffRequestHistory';
import { WithdrawActionButton } from '../timeoff/WithdrawActionButton';

interface Props {
  timeOff: PtoRequestFormatted | undefined;
  onClosePtoDetailshandler: () => void;
}

const leaveTypePolish = new Map<string, string>([
  ['pto', 'Urlop wypoczynkowy'],
  ['pto_on_demand', 'Urlop na żądanie'],
  ['on_saturday_pto', 'Odbiór za święto w sobotę'],
  ['occasional_leave', 'Urlop okolicznościowy'],
  ['child_care', 'Opieka nad dzieckiem'],
]);

export const CalendarPtoDetails = ({ timeOff, onClosePtoDetailshandler }: Props) => {
  const [bg, setBg] = useState<string>('');

  useEffect(() => {
    if (timeOff?.leaveType === 'pto') {
      setBg(holiday_summer);
    } else if (timeOff?.leaveType === 'pto_on_demand') {
      setBg(on_request_holiday);
    } else if (timeOff?.leaveType === 'on_saturday_pto') {
      setBg(saturday_holiday);
    } else if (timeOff?.leaveType === 'occasional_leave') {
      setBg(occasional_leave);
    } else if (timeOff?.leaveType === 'child_care') {
      setBg(child_care);
    } else {
      setBg('');
    }
  }, [timeOff]);

  if (!timeOff) return null;
  return (
    <Box position={'relative'} w={'400px'} borderRadius={'20px'} bg={'white'} fontSize={'1.2rem'} >
      <CloseIcon
        pos={'absolute'}
        right={'15px'}
        top={'10px'}
        zIndex={100}
        cursor={'pointer'}
        onClick={onClosePtoDetailshandler}
      />
      <Box
        borderRadius={'20px'}
        pos={'absolute'}
        bgImage={bg}
        bgSize={'cover'}
        bgRepeat={'no-repeat'}
        bgPos={'center'}
        w={'400px'}
        h={'700px'}
        filter={'blur(1px)'}
        opacity={timeOff.leaveType === 'on_saturday_pto' || timeOff.leaveType === 'child_care' ? 0.4 : 0.7}
      ></Box>
      <VStack
        pos={'relative'}
        w={'100%'}
        align={'start'}
        p={5}
        h={'700px'}
        overflowY={'scroll'}
        style={{ scrollbarWidth: 'none', overflow: '-moz-scrollbars-none' }}
        fontWeight={'700'}
        color={timeOff.leaveType === 'occasional_leave' ? 'whiteAlpha.800' : 'blackAlpha.800'}
        textShadow={
          timeOff.leaveType === 'occasional_leave'
            ? '1px 1px 1px black, -1px -1px 1px black, 1px -1px 1px black, -1px 1px 1px black'
            : ''
        }
      >
        <Text>{leaveTypePolish.get(timeOff.leaveType)}</Text>
        <HStack>
          <Text>{timeOff.ptoStart.toLocaleString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })}</Text>
          <Text>-</Text>
          <Text>{timeOff.ptoEnd.toLocaleString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })}</Text>
        </HStack>
        <HStack
          p={1}
          borderRadius={'10px'}
          backgroundColor={'rgba(255,255,255,.5)'}
          boxShadow={'4px 4px 14px 0px rgba(60, 70, 90, 1)'}
          fontWeight={'600'}
        >
          {timeOff.wasMarkedToWithdraw && !timeOff.wasWithdrawn && (
            <Text color={'orange.500'}>ZAAKCEPTOWANY, ZGŁOSZONY DO WYCOFANIA</Text>
          )}
          {timeOff.wasWithdrawn && <Text color={'orange.500'}>ZAAKCEPTOWANY I WYCOFANY</Text>}
          {timeOff.pending && <Text color={'yellow.500'}>OCZEKUJE</Text>}
          {!timeOff.wasMarkedToWithdraw && !timeOff.wasWithdrawn && !timeOff.pending && timeOff.wasAccepted && (
            <Text color={'green.500'}>ZAAKCEPTOWANY</Text>
          )}
          {!timeOff.wasWithdrawn && !timeOff.pending && !timeOff.wasAccepted && (
            <Text color={'red.500'}>
              ODRZUCONY {(timeOff.declineReason && `- ${timeOff.declineReason}`) || ' -brak podanego powodu'}
            </Text>
          )}
        </HStack>
        {!timeOff.pending && timeOff.decisionDateTime && (
          <VStack w={'100%'} fontWeight={500} align={'start'}>
            <Text>Data decyzji: </Text>
            <Text>
              {timeOff.decisionDateTime.toLocaleString('pl-PL', {
                day: '2-digit',
                month: 'long',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </Text>
          </VStack>
        )}
        <VStack w={'100%'} fontWeight={500} align={'start'}>
          <Text>Data i godzina wniosku</Text>
          <Text>{new Date(timeOff.requestDateTime).toLocaleString('pl-PL')}</Text>
        </VStack>
        <VStack w={'100%'} fontWeight={500} align={'start'}>
          <Text>Rozpatrujący:</Text>
          <HStack>
            <Text>{timeOff.acceptorFirstName}</Text>
            <Text>{timeOff.acceptorLastName}</Text>
          </HStack>
        </VStack>

        <VStack w={'100%'} align={'start'} mt={10} fontWeight={600}>
          <HStack w={'500px'}>
            <GrNotes fontSize={'30px'} color='black' />
            <Text>Historia wniosku</Text>
          </HStack>
          <VStack spacing={0}>
            {timeOff.requestHistory.map(history => (
              <TimeOffRequestHistory key={history.historyId} history={history} size='sm' />
            ))}
          </VStack>
        </VStack>
        <WithdrawActionButton request={timeOff} closeModal={onClosePtoDetailshandler} />
      </VStack>
    </Box>
  );
};
