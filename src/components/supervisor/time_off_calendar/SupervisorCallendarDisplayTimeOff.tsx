import { GridItem, HStack, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';
import { PtoRequestFormatted, ptoTypeTranslatePl } from '../../../model/Pto';
import usePtoModalStore from '../../../state/usePtoModalStore';

interface Props {
  pto: PtoRequestFormatted;
  monday: Date;
  sunday: Date;
  highlightedPto: number;
  setHighlightedPto: (value: React.SetStateAction<number>) => void;
}

export const SupervisorCallendarDisplayTimeOff = ({
  pto,
  monday,
  sunday,
  highlightedPto,
  setHighlightedPto,
}: Props) => {
  const setPtoExtended = usePtoModalStore(s => s.setPtoExtendedModal);
  const startingThisWeek = pto.ptoStart.getTime() >= monday.getTime();
  const endingThisWeek = pto.ptoEnd.getTime() <= sunday.getTime();
  const start = startingThisWeek ? (pto.ptoStart.getDay() === 0 ? 7 : pto.ptoStart.getDay()) : 1;
  const end = endingThisWeek ? (pto.ptoEnd.getDay() === 0 ? 7 : pto.ptoEnd.getDay()) : 7;

  return (
    <Tooltip
      whiteSpace={'pre-line'}
      label={`${pto.applierFirstName} ${pto.applierLastName}\n${pto.ptoStart.toLocaleString('pl-PL', {
        dateStyle: 'long',
      })} - ${pto.ptoEnd.toLocaleString('pl-PL', { dateStyle: 'long' })}\n${ptoTypeTranslatePl.get(pto.leaveType)}\n${
        pto.wasAccepted ? 'ZAAKCEPTOWANY' : 'OCZEKUJE'
      }`}
    >
      <GridItem
        onMouseEnter={() => setHighlightedPto(pto.id)}
        onMouseLeave={() => setHighlightedPto(-1)}
        onClick={() => setPtoExtended(pto)}
        cursor={'pointer'}
        display={'flex'}
        justifyContent={'start'}
        alignItems={'center'}
        colStart={start}
        colEnd={end + 1}
        h={'30px'}
        zIndex={1000}
        borderRadius={
          startingThisWeek && endingThisWeek
            ? '40px'
            : startingThisWeek
            ? '40px 0 0 40px'
            : endingThisWeek
            ? '0 40px 40px 0'
            : ''
        }
        outline={pto.id === highlightedPto ? 'solid' : ''}
        bg={
          pto.id === highlightedPto ? 'teal.300' : pto.wasAccepted ? 'rgba(10, 210, 10, .4)' : 'rgba(250, 230, 180, .4)'
        }
        transition={'background .25s'}
      >
        {pto.applierImageUrl ? (
          <img
            src={pto.applierImageUrl}
            style={{
              height: '100%',
              objectFit: 'contain',
              borderRadius: '50px',
            }}
            referrerPolicy='no-referrer'
          />
        ) : (
          <FaRegCircleUser filter='blur(2px)' opacity={0.4} size={'100%'} />
        )}
        <HStack w={'100%'} ml={1} fontWeight={'600'}>
          <Text
            sx={{
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {pto.applierFirstName}
          </Text>
          <Text
            sx={{
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {pto.applierLastName}
          </Text>
        </HStack>
      </GridItem>
    </Tooltip>
  );
};
