import {
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  Tooltip,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { ChatIcon } from '@chakra-ui/icons';
import { useEffect, useRef, useState } from 'react';
import { FaUserTie } from 'react-icons/fa';
import { FaCircleCheck, FaCircleMinus } from 'react-icons/fa6';
import { GiPalmTree } from 'react-icons/gi';
import { MdChildFriendly, MdEventRepeat, MdTimer } from 'react-icons/md';
import useResolvePto from '../../hooks/useResolvePto';
import { ResolvePtoRequest } from '../../model/Pto';
import useHttpErrorState from '../../state/useHttpErrorState';
import usePtoModalStore from '../../state/usePtoModalStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const UnresolvedTimeOffRequestModal = ({ isOpen, onClose }: Props) => {
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDeclining, setIsDecllining] = useState(false);
  const r = usePtoModalStore(s => s.ptoExtendedModal);
  const setPtoToCompare = usePtoModalStore(s => s.setPtoToCompareDates);
  const setError = useHttpErrorState(s => s.setError);
  const { mutate: sendRequest, isError, error, isLoading, isSuccess } = useResolvePto();

  const closeModal = () => {
    setIsDecllining(false);
    onClose();
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Wniosek rozpatrzony poprawnie',
        position: 'top-left',
        isClosable: true,
        status: 'success',
        duration: 10000,
      });
    }
    closeModal();
  }, [isSuccess]);

  useEffect(() => {
    isError && setError(error);
  }, [isError]);

  const handleAcceptRequest = () => {
    const request: ResolvePtoRequest = {
      ptoRequestId: r!.id,
      isAccepted: true,
      declineReason: undefined,
    };
    sendRequest(request);
  };

  const handleRejectRequest = () => {
    const request: ResolvePtoRequest = {
      ptoRequestId: r!.id,
      isAccepted: false,
      declineReason: (inputRef && inputRef.current?.value) || undefined,
    };
    sendRequest(request);
  };

  if (!r) return null;
  return (
    <Modal isOpen={isOpen} onClose={closeModal} size={'4xl'}>
      <ModalOverlay />

      <ModalContent pos={'relative'} overflow={'hidden'}>
        <ModalHeader textAlign={'center'}>WNIOSEK URLOPOWY</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Heading borderBottom={'solid'} w={'100%'} textAlign={'center'}>
              {r.applierFirstName} {r.applierLastName}
            </Heading>
            <HStack mb={'50px'} as={'em'} fontSize={'1.1rem'} fontWeight={'600'}>
              <Text>łącznie naliczonych dni urlopowych:</Text>
              <Text fontSize={'1.1rem'} fontWeight={'700'}>{r.applierPtoDaysTaken + r.applierPtoDaysTotal}</Text>
              <Text>wykorzystane łącznie:</Text>
              <Text fontSize={'1.1rem'} fontWeight={'700'}>{r.applierPtoDaysTaken}</Text>
              <Text>pozostałe:</Text>
              <Text fontSize={'1.1rem'} fontWeight={'700'}>{r.applierPtoDaysTotal}</Text>
            </HStack>
            <HStack w={'100%'} fontWeight={'600'} fontSize={'1.2rem'} align={'end'}>
              <Text>Proszę o udzielenie</Text>
              <Text textDecor={'underline'} fontSize={'1.5rem'}>
                {r.businessDays}
              </Text>
              <Text>{r.businessDays === 1 ? 'dnia.' : 'dni.'}</Text>
            </HStack>
            <HStack w={'100%'} fontWeight={'600'} fontSize={'1.2rem'}>
              {r.leaveType === 'pto' && (
                <HStack>
                  <GiPalmTree size={'30px'} />
                  <Text>urlopu wypoczynkowego</Text>
                </HStack>
              )}
              {r.leaveType === 'pto_on_demand' && (
                <HStack>
                  <MdTimer size={'30px'} />
                  <Text>urlopu wypoczynkowego na żądanie</Text>
                </HStack>
              )}
              {r.leaveType === 'on_saturday_pto' && (
                <HStack>
                  <MdEventRepeat size={'30px'} />
                  <Text>odbiór dnia wolnego za święto wypadające w sobotę- </Text>
                  <Text>{r.saturday_holiday_date}</Text>
                </HStack>
              )}
              {r.leaveType === 'occasional_leave' && (
                <HStack>
                  <FaUserTie size={'30px'} />
                  <Text>zwolnienie okolicznościowe- </Text>
                  <Text>{r.occasional_descriptionPolish}</Text>
                </HStack>
              )}
              {r.leaveType === 'child_care' && (
                <HStack>
                  <MdChildFriendly size={'30px'} />
                  <Text>zwolnienie okolicznościowe z tytułu opieki nad dzieckiem</Text>
                </HStack>
              )}
            </HStack>
            <HStack
              w={'100%'}
              fontWeight={'600'}
              fontSize={'1.6rem'}
              cursor={'pointer'}
              onClick={() => setPtoToCompare(r)}
            >
              <Text>{r.businessDays == 1 ? 'w dniu:' : 'w dniach:'} </Text>
              <Text fontWeight={'700'}>{r.ptoStart.toLocaleString('pl-PL')}</Text>
              {r.businessDays > 1 && <Text fontWeight={'700'}>- {r.ptoEnd.toLocaleString('pl-PL')}</Text>}
            </HStack>
            <VStack w={'100%'} mt={'50px'}>
              <VStack w={'100%'} mb={10}>
                <HStack w={'100%'}>
                  <Text fontWeight={'600'} fontSize={'1.3rem'}>
                    STATUS:{' '}
                  </Text>
                  {r.wasMarkedToWithdraw && !r.wasWithdrawn && (
                    <Text fontWeight={'600'} fontSize={'2rem'} color={'orange.500'}>
                      ZAAKCEPTOWANY, ZGŁOSZONY DO WYCOFANIA
                    </Text>
                  )}
                  {r.wasWithdrawn && (
                    <Text fontWeight={'600'} fontSize={'2rem'} color={'orange.500'}>
                      ZAAKCEPTOWANY I WYCOFANY
                    </Text>
                  )}
                  {r.pending && (
                    <Text fontWeight={'600'} fontSize={'2rem'} color={'yellow.500'}>
                      OCZEKUJE
                    </Text>
                  )}
                  {!r.wasMarkedToWithdraw && !r.wasWithdrawn && !r.pending && r.wasAccepted && (
                    <Text fontWeight={'600'} fontSize={'2rem'} color={'green.400'}>
                      ZAAKCEPTOWANY
                    </Text>
                  )}
                  {!r.wasWithdrawn && !r.pending && !r.wasAccepted && (
                    <Text fontWeight={'600'} fontSize={'2rem'} color={'red.500'}>
                      ODRZUCONY {(r.declineReason && `- ${r.declineReason}`) || ' -brak podanego powodu'}
                    </Text>
                  )}
                </HStack>
                {!r.pending && (
                  <HStack w={'100%'}>
                    <Text>Data decyzji: </Text>{' '}
                    <Text>
                      {new Date(r.decisionDateTime).toLocaleString('pl-PL', {
                        day: '2-digit',
                        month: 'long',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </Text>
                  </HStack>
                )}
                {!r.pending && r.wasWithdrawn && (
                  <HStack w={'100%'}>
                    <Text>Data wycofania: </Text>{' '}
                    <Text>
                      {r.withdrawnDateTime
                        ? r.withdrawnDateTime.toLocaleString('pl-PL', {
                            day: '2-digit',
                            month: 'long',
                            year: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })
                        : 'NIEPOPRAWNA DATA'}
                    </Text>
                  </HStack>
                )}
              </VStack>
              <HStack w={'100%'}>
                <Text>Data i godzina wniosku</Text>
                <Text>{new Date(r.requestDateTime).toLocaleString('pl-PL')}</Text>
              </HStack>
              <HStack w={'100%'}>
                <Text>Rozpatrujący:</Text>
                <Text>{r.acceptorFirstName}</Text>
                <Text>{r.acceptorLastName}</Text>
              </HStack>
            </VStack>
            <VStack w={'100%'} align={'start'} mt={10}>
              <HStack w={'500px'}>
                <ChatIcon fontSize={'30px'} />
                <Text>Uwagi wnioskującego</Text>
              </HStack>
              <Textarea
                w={'500px'}
                isDisabled
                value={r.applierNotes ? r.applierNotes : 'BRAK UWAG WNIOSKUJĄCEGO'}
                resize={'none'}
                _disabled={{
                  cursor: 'default',
                }}
              />
            </VStack>
            {!r.pending && (
              <VStack w={'100%'} align={'start'} mt={2}>
                <HStack w={'500px'}>
                  <ChatIcon fontSize={'30px'} />
                  <Text>Uwagi akceptującego</Text>
                </HStack>
                <Textarea
                  w={'500px'}
                  isDisabled
                  value={r.acceptorNotes ? r.acceptorNotes : 'BRAK UWAG AKCEPTUJĄCEGO'}
                  resize={'none'}
                  _disabled={{
                    cursor: 'default',
                  }}
                />
              </VStack>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter mt={10} display={'flex'} justifyContent={'center'} alignItems={'center'} p={0} pos={'relative'}>
          {!isLoading && (
            <>
              <Button
                display={!isDeclining ? '' : 'none'}
                borderRadius={0}
                w={'100%'}
                colorScheme='green'
                onClick={handleAcceptRequest}
              >
                {r.wasMarkedToWithdraw ? 'Wycofaj' : 'Zaakceptuj'}
              </Button>
              <HStack w={'100%'}>
                {!isDeclining && (
                  <Button borderRadius={0} w={'100%'} colorScheme='red' onClick={() => setIsDecllining(s => true)}>
                    Odrzuć
                  </Button>
                )}
                {isDeclining && (
                  <>
                    <Input ref={inputRef} placeholder='Powód odmowy (opcjonalnie)' />
                    <Tooltip label='Wyślij'>
                      <Flex justify={'center'} align={'center'} cursor={'pointer'}>
                        <FaCircleCheck color='green' size={'2rem'} onClick={handleRejectRequest} />
                      </Flex>
                    </Tooltip>
                    <Tooltip label='Anuluj'>
                      <Flex
                        justify={'center'}
                        align={'center'}
                        color={'red.400'}
                        cursor={'pointer'}
                        onClick={() => setIsDecllining(s => false)}
                      >
                        <FaCircleMinus size={'2rem'} onClick={() => setIsDecllining(false)} />
                      </Flex>
                    </Tooltip>
                  </>
                )}
              </HStack>
            </>
          )}
          {isLoading && (
            <HStack fontSize={'2rem'}>
              <Text>Wysyłam...</Text>
              <Spinner />
            </HStack>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
