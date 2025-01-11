import {
  Box,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';

import { GrNotes } from 'react-icons/gr';
import child_care from '../../assets/child_care_leave.jpeg';
import holiday_summer from '../../assets/holiday_summer.jpeg';
import occasional_leave from '../../assets/occasional_leave.jpg';
import on_request_holiday from '../../assets/pto_on_request.jpg';
import saturday_holiday from '../../assets/saturday_holiday.jpg';
import usePtoModalStore from '../../state/usePtoModalStore';
import { TimeOffRequestHistory } from './time_off_request_history/TimeOffRequestHistory';
import { generateTimeOffPdf, resendMailRequest } from '../../service/TimeOffHttpService';
import { useState } from 'react';
import useSettingsStore from '../../state/useSettingsState';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PtoRequestExtendedModalForSupervisor = ({ isOpen, onClose }: Props) => {
  const r = usePtoModalStore(s => s.ptoExtendedModal);
  const isMailingEnabled = useSettingsStore(s => s.isMailingEnabled);
  const [isSending, setIsSending] = useState(false);

  const resendToHr = () => {
    if (!r) return;
    setIsSending(true);
    resendMailRequest(r.id).then(r => {
      setIsSending(false);
    });
  };

  const onGeneratePdf = () => {
    if (!r) return;
    generateTimeOffPdf(r.id);
  };
  if (!r) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
      <ModalOverlay />
      <ModalContent p={10} pos={'relative'}>
        <Box
          pos={'absolute'}
          top={0}
          left={0}
          w={'100%'}
          h={'100%'}
          bgImage={
            r.leaveType === 'pto'
              ? holiday_summer
              : r.leaveType === 'pto_on_demand'
              ? on_request_holiday
              : r.leaveType === 'on_saturday_pto'
              ? saturday_holiday
              : r.leaveType === 'occasional_leave'
              ? occasional_leave
              : r.leaveType === 'child_care'
              ? child_care
              : ''
          }
          bgPos={'center'}
          bgRepeat={'no-repeat'}
          bgSize={'cover'}
          filter={'blur(3px)'}
          opacity={r.leaveType === 'on_saturday_pto' || r.leaveType === 'child_care' ? 0.4 : 0.7}
        />
        <ModalHeader zIndex={100} textAlign={'center'} fontWeight={700} color={'black'} fontSize={'1.4rem'}>
          <HStack>
            <Text flex={1}></Text>
            <Text flex={1}>WNIOSEK URLOPOWY</Text>
            <Text flex={1} textAlign={'end'}>
              ID: {r.id}
            </Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody zIndex={100} color={'black'}>
          <VStack>
            <Heading mb={'50px'} borderBottom={'solid'} w={'100%'} textAlign={'center'}>
              {r.applierFirstName} {r.applierLastName}
            </Heading>
            <HStack w={'100%'} fontWeight={'600'} fontStyle={'italic'} fontSize={'1.2rem'} align={'end'}>
              <Text>Proszę o udzielenie</Text>
              <Text textDecor={'underline'} fontSize={'1.5rem'}>
                {r.businessDays}
              </Text>
              <Text>{r.businessDays === 1 ? 'dnia' : 'dni'}</Text>
              {r.leaveType === 'pto' && <Text>urlopu wypoczynkowego</Text>}
              {r.leaveType === 'pto_on_demand' && <Text>urlopu wypoczynkowego na żądanie</Text>}
              {r.leaveType === 'on_saturday_pto' && <Text>- odbiór dnia wolnego za święto wypadające w sobotę </Text>}
              {r.leaveType === 'occasional_leave' && <Text>- zwolnienie okolicznościowe z tytułu</Text>}
              {r.leaveType === 'child_care' && <Text>- zwolnienie okolicznościowe z tytułu opieki nad dzieckiem</Text>}
            </HStack>
            {r.leaveType === 'on_saturday_pto' && (
              <HStack w={'100%'} fontWeight={'600'} fontStyle={'italic'} fontSize={'1.3rem'} justify={'center'}>
                <Text>{r.saturday_holiday_date}</Text>
                <Text>{r.saturday_holiday_desc}</Text>
              </HStack>
            )}
            {r.leaveType === 'occasional_leave' && (
              <Text w={'100%'} fontWeight={'600'} fontStyle={'italic'} fontSize={'1.2rem'}>
                {r.occasional_descriptionPolish}
              </Text>
            )}

            <HStack w={'100%'} fontWeight={'600'} fontSize={'1.6rem'} fontStyle={'italic'}>
              <Text>{r.businessDays == 1 ? 'w dniu:' : 'w dniach:'} </Text>
              <Text fontWeight={'700'}>{r.ptoStart.toLocaleDateString('pl-PL')}</Text>
              {r.businessDays > 1 && <Text fontWeight={'700'}>- {r.ptoEnd.toLocaleDateString('pl-PL')}</Text>}
            </HStack>
            <VStack w={'100%'} mt={'50px'}>
              <VStack w={'100%'} mb={10} alignItems={'start'}>
                <HStack
                  p={1}
                  borderRadius={'10px'}
                  backgroundColor={'rgba(255,255,255,.5)'}
                  boxShadow={'4px 4px 14px 0px rgba(60, 70, 90, 1)'}
                  fontWeight={'600'}
                  fontSize={'2rem'}
                >
                  {r.wasMarkedToWithdraw && !r.wasWithdrawn && (
                    <Text color={'orange.500'}>ZAAKCEPTOWANY, ZGŁOSZONY DO WYCOFANIA</Text>
                  )}
                  {r.wasWithdrawn && <Text color={'orange.500'}>ZAAKCEPTOWANY I WYCOFANY</Text>}
                  {r.pending && <Text color={'yellow.500'}>OCZEKUJE</Text>}
                  {!r.wasMarkedToWithdraw && !r.wasWithdrawn && !r.pending && r.wasAccepted && (
                    <Text color={'green.500'}>ZAAKCEPTOWANY</Text>
                  )}
                  {!r.wasWithdrawn && !r.pending && !r.wasAccepted && (
                    <Text color={'red.500'}>
                      ODRZUCONY {(r.declineReason && `- ${r.declineReason}`) || ' -brak podanego powodu'}
                    </Text>
                  )}
                </HStack>
                {!r.pending && (
                  <HStack w={'100%'} fontWeight={500}>
                    <Text>Data decyzji: </Text>
                    <Text>
                      {r.decisionDateTime
                        ? r.decisionDateTime.toLocaleString('pl-PL', {
                            day: '2-digit',
                            month: 'long',
                            year: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })
                        : ''}
                    </Text>
                  </HStack>
                )}
                {!r.pending && r.wasWithdrawn && (
                  <HStack w={'100%'} fontWeight={500}>
                    <Text>Data wycofania: </Text>
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
                        : ''}
                    </Text>
                  </HStack>
                )}
              </VStack>
              <HStack w={'100%'} fontWeight={500}>
                <Text>Data i godzina wniosku</Text>
                <Text>{new Date(r.requestDateTime).toLocaleString('pl-PL')}</Text>
              </HStack>
              <HStack w={'100%'} fontWeight={500}>
                <Text>Rozpatrujący:</Text>
                <Text>{r.acceptorFirstName}</Text>
                <Text>{r.acceptorLastName}</Text>
              </HStack>
            </VStack>
            <VStack w={'100%'} align={'start'} mt={10} fontWeight={600}>
              <HStack w={'500px'}>
                <GrNotes fontSize={'30px'} />
                <Text>Historia wniosku</Text>
              </HStack>
              <VStack pl={5} spacing={0}>
                {r.requestHistory.map(history => (
                  <TimeOffRequestHistory key={history.historyId} history={history} />
                ))}
              </VStack>
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter zIndex={100} justifyContent={'space-evenly'}>
          {!r.applierFreelancer && r.decisionDateTime && r.wasAccepted && !r.wasWithdrawn && (
            <>
              <Tooltip
                label={
                  !isSending
                    ? 'Naciśnięcie powoduje rozesłanie wiadomości z załącznikiem do kadr oraz wnioskującego i akceptującego.'
                    : 'Wysyłam...'
                }
              >
                <Button minW={'140px'} colorScheme='green' isDisabled={!isMailingEnabled || isSending} onClick={resendToHr}>
                  {!isMailingEnabled ? 'Mailing wyłączony- sprawdź ustawienia' : !isSending ? 'Wyślij mail ponownie' : <Spinner />}
                </Button>
              </Tooltip>
              <Button onClick={onGeneratePdf} colorScheme='green' w={'180px'}>
                Wygeneruj PDF
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
