import { Box, Flex, HStack, Text, Tooltip, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { FaBusinessTime, FaCalendarAlt, FaUserTie } from 'react-icons/fa';
import { GiPalmTree } from 'react-icons/gi';
import { MdChildFriendly, MdEventRepeat, MdSupervisorAccount, MdTimer } from 'react-icons/md';
import { PtoRequestFormatted } from '../../../model/Pto';
import usePtoModalStore from '../../../state/usePtoModalStore';
import useThemeState from '../../../state/useThemeState';
import { CalendarPageIcon } from '../../general/CalendarPageIcon';
import { PtoCardStatus } from '../../timeoff/PtoCardStatus';

interface Props {
    timeOff: PtoRequestFormatted;
}

export const TimeOffRequestCard = ({timeOff}: Props) => {
    const theme = useThemeState(s => s.themeConfig);
    const setPtoExtendedModal = usePtoModalStore(s => s.setPtoExtendedModal);
    const [daysTotalHovering, setDaysTotalhovering] = useState(false);
    const [daysBusinessHovering, setDaysBusinesshovering] = useState(false);
  return (
        <Box w={'100%'} maxW={'800px'} position={'relative'}>
          <Tooltip label='ID wniosku'>
            <Flex
              opacity={timeOff.wasMarkedToWithdraw ? 0.8 : 1}
              zIndex={1}
              position={'absolute'}
              justifyContent={'center'}
              alignItems={'center'}
              fontSize={'.9rem'}
              fontWeight={'600'}
              color={'whiteAlpha.900'}
              top={'-5px'}
              left={0}
              borderRadius={'50px'}
              bg={'#008AFF'}
              w={'40px'}
              h={'20px'}
              p={1}
              boxShadow={'4px 4px 14px 0px rgba(66, 68, 90, 1)'}
              cursor={'pointer'}
              onClick={() => setPtoExtendedModal(timeOff)}
            >
              ID:{timeOff.id}
            </Flex>
          </Tooltip>
          <VStack
            opacity={timeOff.wasMarkedToWithdraw ? 0.8 : 1}
            position={'relative'}
            overflow={'hidden'}
            w={'100%'}
            flexShrink={0}
            flexGrow={0}
            mb={2}
            px={2}
            justifyContent={'start'}
            alignItems={'center'}
            cursor={'help'}
            borderRadius={'20px'}
            spacing={0}
            bg={
                timeOff.pending || (timeOff.wasMarkedToWithdraw && !timeOff.wasWithdrawn)
                ? 'rgba(255, 255, 120, .6)'
                : timeOff.wasAccepted
                ? 'rgba(20, 255, 120, .6)'
                : 'rgba(255, 120, 120, .6)'
            }
            boxShadow={'2xl'}
            transitionProperty={'transform'}
            transitionDuration={'.2s'}
          >
            <Tooltip
              whiteSpace='pre-line'
              label={`Akceptujący:
            ${timeOff.acceptorFirstName} ${timeOff.acceptorLastName}
            ${timeOff.acceptorEmail}`}
            >
              <Flex
                cursor={'help'}
                position={'absolute'}
                fontSize={'2rem'}
                color={theme.secondColor}
                bottom={0}
                left={2}
              >
                <MdSupervisorAccount />
              </Flex>
            </Tooltip>
            <VStack w={'100%'}>
              <HStack w={'100%'} px={'40px'} py={1} justifyContent={'space-evenly'} alignItems={'center'}>
                <Tooltip
                  whiteSpace='pre-line'
                  label={`Data wniosku:
            ${timeOff.requestDateTime.toLocaleString('pl-PL', { day: '2-digit', month: 'long', year: '2-digit' })}
            ${timeOff.requestDateTime.toLocaleString('pl-PL', { hour: '2-digit', minute: '2-digit' })}`}
                >
                  <Box cursor={'help'}>
                    <CalendarPageIcon date={timeOff.requestDateTime} size='sm' color='black'/>
                  </Box>
                </Tooltip>
                <Tooltip
                  label={
                    (timeOff.businessDays > 1 &&
                      `${timeOff.ptoStart.toLocaleString('pl-PL', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })} - ${timeOff.ptoEnd.toLocaleString('pl-PL', { day: '2-digit', month: 'long', year: 'numeric' })}`) ||
                      timeOff.ptoStart.toLocaleString('pl-PL', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })
                  }
                >
                  <HStack w={'100px'} justifyContent={'space-between'} cursor={'help'}>
                    <CalendarPageIcon date={timeOff.ptoStart} size='sm' color='black'/>
                    <CalendarPageIcon date={timeOff.ptoEnd} size='sm'color='black' />
                  </HStack>
                </Tooltip>
                <VStack borderRadius={'20px'} color={theme.secondColor} fontWeight={'500'} gap={0} spacing={0}>
                  <HStack
                    position={'relative'}
                    onMouseEnter={e => setDaysBusinesshovering(true)}
                    onMouseLeave={e => setDaysBusinesshovering(false)}
                  >
                    <Text
                      style={{
                        position: 'absolute',
                        fontSize: '.8rem',
                        width: '130px',
                        right: '-5px',
                        opacity: daysBusinessHovering ? 1 : 0,
                        visibility: daysBusinessHovering ? 'visible' : 'hidden',
                        transitionProperty: 'transform, visibility, opacity',
                        transitionDuration: '.25s',
                        transform: daysBusinessHovering ? 'translateX(-2px)' : 'translateX(0)',
                      }}
                    >
                      Dni roboczych
                    </Text>
                    <FaBusinessTime />
                    <Box>{timeOff.businessDays}</Box>
                  </HStack>
                  <HStack
                    position={'relative'}
                    onMouseEnter={e => setDaysTotalhovering(true)}
                    onMouseLeave={e => setDaysTotalhovering(false)}
                  >
                    <Text
                      style={{
                        position: 'absolute',
                        fontSize: '.6rem',
                        width: '130px',
                        right: '-5px',
                        opacity: daysTotalHovering ? 1 : 0,
                        visibility: daysTotalHovering ? 'visible' : 'hidden',
                        transitionProperty: 'transform, visibility, opacity',
                        transitionDuration: '.2s',
                        transform: daysTotalHovering ? 'translateX(-1px)' : 'translateX(0)',
                      }}
                    >
                      Dni kalendarzowych
                    </Text>
                    <FaCalendarAlt />
                    <Box>{timeOff.totalDays}</Box>
                  </HStack>
                </VStack>
                <Box cursor={'help'}>
                  {timeOff.leaveType === 'pto' && (
                    <Tooltip label='Wypoczynkowy'>
                      <Box>
                        <GiPalmTree color={theme.secondColor} size={'40px'} />
                      </Box>
                    </Tooltip>
                  )}
                  {timeOff.leaveType === 'pto_on_demand' && (
                    <Tooltip label='Na żądanie'>
                      <Box>
                        <MdTimer color={theme.secondColor} size={'40px'} />
                      </Box>
                    </Tooltip>
                  )}
                  {timeOff.leaveType === 'on_saturday_pto' && (
                    <Tooltip label={`Odbiór za święto w sobotę: ${timeOff.saturday_holiday_date}`}>
                      <Box>
                        <MdEventRepeat color={theme.secondColor} size={'40px'} />
                      </Box>
                    </Tooltip>
                  )}
                  {timeOff.leaveType === 'occasional_leave' && (
                    <Tooltip label={`Okolicznościowy: ${timeOff.occasional_descriptionPolish}`}>
                      <Box>
                        <FaUserTie color={theme.secondColor} size={'40px'} />
                      </Box>
                    </Tooltip>
                  )}
                  {timeOff.leaveType === 'child_care' && (
                    <Tooltip label='Opieka nad dzieckiem'>
                      <Box>
                        <MdChildFriendly color={theme.secondColor} size={'40px'} />
                      </Box>
                    </Tooltip>
                  )}
                </Box>
                <PtoCardStatus pto={timeOff} />
              </HStack>
            </VStack>
          </VStack>
        </Box>
  )
}
