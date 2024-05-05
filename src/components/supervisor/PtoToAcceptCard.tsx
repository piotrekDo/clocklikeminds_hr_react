import { TriangleDownIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, InputGroup, Text, Textarea, Tooltip, VStack, useToast } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { FaCalendarTimes, FaRegCalendarCheck } from 'react-icons/fa';
import { HiPlusCircle } from 'react-icons/hi';
import { HiOutlineIdentification } from 'react-icons/hi2';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { PtoRequestFormatted, ResolvePtoRequest } from '../../model/Pto';
import useHttpErrorState from '../../state/useHttpErrorState';
import useResolvePto from '../../hooks/useResolvePto';

interface Props {
  pto: PtoRequestFormatted;
}

export const PtoToAcceptCard = ({ pto }: Props) => {
  const toast = useToast();
  const setError = useHttpErrorState(s => s.setError);
  const { mutate: sendRequest, isSuccess, isLoading, isError, error } = useResolvePto();

  const ref = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  useEffect(() => {
    isError && setError(error);
  }, [isError]);

  useEffect(() => {
    if (!isSuccess) return;
    toast({
      title: 'Wniosek rozpatrzony',
      position: 'top-left',
      isClosable: true,
      status: 'success',
      duration: 10000,
    });
  }, [isSuccess]);

  const onAcceptHandler = () => {
    const request: ResolvePtoRequest = {
      ptoRequestId: pto.id,
      isAccepted: true,
      declineReason: undefined,
    };
    sendRequest(request);
  };

  const onDeclineHandler = () => {
    const request: ResolvePtoRequest = {
      ptoRequestId: pto.id,
      isAccepted: false,
      declineReason: ref.current.value,
    };
    sendRequest(request);
  };

  return (
    <VStack
      position={'relative'}
      w={'500px'}
      flexShrink={0}
      flexGrow={0}
      p={2}
      gap={0}
      justifyContent={'start'}
      alignItems={'center'}
      overflow={'hidden'}
      borderRadius={'20px'}
      spacing={0}
      bg={'gray.100'}
      transitionProperty={'height'}
      transitionDuration={'250ms'}
    >
      <HStack w={'100%'} justifyContent={'space-between'}>
        <HStack>
          <IoPersonCircleOutline />
          <Text>{pto.applierFirstName}</Text>
          <Text>{pto.applierLastName}</Text>
        </HStack>
        <HStack>
          <Tooltip label={`${pto.businessDays} dni roboczych, ${pto.totalDays} łącznie`}>
            <HStack>
              <HiPlusCircle />
              <Text>{pto.businessDays}</Text>
            </HStack>
          </Tooltip>
          <Tooltip label='Id wniosku'>
            <HStack>
              <HiOutlineIdentification />
              <Text>{pto.id}</Text>
            </HStack>
          </Tooltip>
        </HStack>
      </HStack>
      <HStack
        w={'100%'}
        h={'40px'}
        flexShrink={0}
        gap={0}
        justifyContent={'space-between'}
        alignItems={'center'}
        fontSize={'.9rem'}
      >
        <Tooltip label={'Data wniosku'}>
          <HStack justifyContent={'center'} alignItems={'center'}>
            <Text>
              {pto.requestDateTime.toLocaleString('pl-PL', {
                day: '2-digit',
                month: 'short',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </HStack>
        </Tooltip>
        <Tooltip label={'Pierwszy dzień urlopu'}>
          <HStack justifyContent={'center'} alignItems={'center'}>
            <FaRegCalendarCheck />
            <Text>{pto.ptoStart.toLocaleString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })}</Text>
          </HStack>
        </Tooltip>
        <Tooltip label={'Ostatni dzień urlopu'}>
          <HStack justifyContent={'center'} alignItems={'center'}>
            <FaCalendarTimes />
            <Text>{pto.ptoEnd.toLocaleString('pl-Pl', { day: '2-digit', month: '2-digit', year: '2-digit' })}</Text>
          </HStack>
        </Tooltip>
        <Box justifyContent={'center'} alignItems={'center'} cursor={'pointer'} onClick={e => setIsExpanded(e => !e)}>
          <TriangleDownIcon
            boxSize={'1.5rem'}
            transitionProperty={'transform'}
            transitionDuration={'250ms'}
            transform={isExpanded ? 'rotateX(180deg)' : ''}
          />
        </Box>
      </HStack>
      <HStack w={'100%'} flexShrink={0} flexGrow={0} flexDir={'column'} display={!isExpanded ? 'none' : 'flex'}>
        <HStack w={'100%'} justifyContent={'space-between'} mt={4} px={10}>
          <Box>
            <Button isDisabled={isLoading} w={'100px'} colorScheme='red' onClick={() => setIsRejecting(true)}>
              Odrzuć
            </Button>
          </Box>
          <Button isDisabled={isLoading} w={'100px'} colorScheme='green' onClick={onAcceptHandler}>
            Zaakceptuj
          </Button>
        </HStack>
        <InputGroup display={!isRejecting ? 'none' : 'inline-block'}>
          <Textarea ref={ref} placeholder='Powód odmowy (opcjonalnie)' />
          <HStack gap={0}>
            <Button
              isDisabled={isLoading}
              colorScheme='yellow'
              borderRadius={'5px 0 0 5px'}
              onClick={() => setIsRejecting(false)}
            >
              X
            </Button>
            <Button
              isDisabled={isLoading}
              w={'100%'}
              colorScheme='red'
              borderRadius={'0 5px 5px 0'}
              onClick={onDeclineHandler}
            >
              Wyślij
            </Button>
          </HStack>
        </InputGroup>
      </HStack>
    </VStack>
  );
};
