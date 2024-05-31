import { Button, HStack, Heading, Select, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useNewPtoRequest from '../../hooks/useNewPtoRequest';
import { NewPtoRequest, NewPtoRequestSummary, PtoType } from '../../model/Pto';
import useAuthentication from '../../state/useAuthentication';
import useHttpErrorState from '../../state/useHttpErrorState';
import usePtoRequestState from '../../state/usePtoRequestState';
import { calculateBusinessDays } from '../Calendar/holidays';
import { SimplePtoForm } from './SimplePtoForm';
import { useQueryClient } from '@tanstack/react-query';
import { MetaData } from '../../model/MetaData';

export const PtoRequestSummary = () => {
  const queryClient = useQueryClient();
  const meta: MetaData | undefined = queryClient.getQueryData(['meta']);
  const { appUser } = useAuthentication();
  const { startDate, endDate, isEndDateError, setStartDate, setEndDate, setIsRequestingPto, setIsEndDateError } =
    usePtoRequestState();
  const [selectedPtoType, setSelectedPtoType] = useState<PtoType>('pto');
  const [occasionalType, setOccasionalType] = useState<string | undefined>(undefined);
  const [summary, setSummary] = useState<NewPtoRequestSummary | undefined>(undefined);
  const { mutate: sendRequest, isSuccess, isError, error, isLoading } = useNewPtoRequest();
  const setHttpError = useHttpErrorState(s => s.setError);

  useEffect(() => {
    if (isSuccess) {
      setStartDate(undefined);
      setEndDate(undefined);
      setIsRequestingPto(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    isError && setHttpError(error);
  }, [isError]);

  useEffect(() => {
    if (!isEndDateError && startDate && endDate) {
      setSummary(calculateBusinessDays(startDate, endDate));
    } else setSummary(undefined);
  }, [startDate, endDate, isEndDateError]);

  const handleSubmitNewPto = () => {
    if (!appUser || !startDate || !endDate) return;
    const request: NewPtoRequest = {
      ptoStart: startDate.toISOString().slice(0, 10),
      ptoEnd: endDate.toISOString().slice(0, 10),
      applierId: appUser.userId,
      acceptorId: undefined,
      ptoType: selectedPtoType,
      occasionalType: occasionalType,
      saturdayHolidayDate: undefined,
    };
    console.log(request);
    sendRequest(request);
  };

  return (
    <VStack
      p={6}
      h={'80%'}
      w={'100%'}
      position={'relative'}
      backgroundColor={'rgba(56,88,152, .6)'}
      color={'whiteAlpha.900'}
      borderRadius={'30px'}
    >
      <Heading fontSize={'1rem'}>Nowy wniosek urlopowy</Heading>
      <Select
        maxW={'500px'}
        border={'solid 2px'}
        backgroundColor={'rgba(56,88,152, .6)'}
        color={'whiteAlpha.900'}
        defaultValue={'pto'}
        onChange={e => {
          setSelectedPtoType(e.target.value as PtoType), setOccasionalType(undefined);
        }}
      >
        <>
          <optgroup style={{ color: 'white', backgroundColor: 'rgba(56,88,152, .6)' }}>
            <option value={'pto'}>Urlop wypoczynkowy</option>
            <option value={'pto_on_demand'}>Urlop wypoczynkowy na żądanie</option>
            <option value={'on_saturday_pto'}>Odbiór dnia wolnego za święto wypadające w sobotę</option>
            <option value={'occasional_leave'}>Urlop okolicznościowy</option>
            <option value={'child_care'}>Opieka nad dzieckiem</option>
          </optgroup>
        </>
      </Select>
      {selectedPtoType === 'occasional_leave' && meta?.occasionalLeaveTypes && (
        <Select
          backgroundColor={'rgba(56,88,152, .6)'}
          color={'whiteAlpha.900'}
          onChange={e => setOccasionalType(e.target.value)}
        >
          <optgroup style={{ color: 'white', backgroundColor: 'rgba(56,88,152, .6)' }}>
            <option value={undefined}>Wybierz rodzaj</option>
          </optgroup>
          <optgroup style={{ color: 'white', backgroundColor: 'rgba(56,88,152, .6)' }}>
            {meta.occasionalLeaveTypes.map(type => (
              <option key={type.occasionalType} value={type.occasionalType}>
                {type.descriptionPolish}
              </option>
            ))}
          </optgroup>
        </Select>
      )}
      <SimplePtoForm isLoading={isLoading} />
      {!isEndDateError && summary && <Text>Zaznaczony okres zawiera {summary.businessDays} dni roboczych</Text>}
      {isEndDateError && <Text>{isEndDateError}</Text>}
      <Button
        isDisabled={isLoading}
        isLoading={isLoading}
        cursor={isEndDateError != undefined || !startDate || !endDate ? 'auto' : 'pointer'}
        opacity={isEndDateError != undefined || !startDate || !endDate ? 0 : 1}
        colorScheme={'green'}
        position={'absolute'}
        top={isEndDateError != undefined || !startDate || !endDate ? '-5px' : '-15px'}
        transitionProperty={'top opacity'}
        transitionDuration={'250ms'}
        transitionTimingFunction={'ease-in'}
        onClick={handleSubmitNewPto}
      >
        Wyślij wniosek
      </Button>
      <HStack zIndex={10} h={'50px'} w={'50%'} justifyContent={'space-between'} position={'absolute'} bottom={'-40px'}>
        <Button
          isDisabled={isLoading}
          w={'150px'}
          colorScheme='yellow'
          onClick={() => {
            setStartDate(undefined);
            setEndDate(undefined);
            setIsRequestingPto(false);
          }}
        >
          Anuluj
        </Button>
        <Button
          isDisabled={isLoading}
          w={'150px'}
          colorScheme='teal'
          onClick={() => {
            setStartDate(undefined);
            setEndDate(undefined);
          }}
        >
          Wyczyść
        </Button>
      </HStack>
    </VStack>
  );
};
