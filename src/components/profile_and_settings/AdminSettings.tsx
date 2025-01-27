import { FormControl, FormLabel, HStack, Switch, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import useSettings from '../../hooks/useSettings';
import useAuthentication from '../../state/useAuthentication';
import useSettingsStore from '../../state/useSettingsState';
import useSwitchMailingLocal from '../../hooks/usemailingEnabledSwitch';
import useMailingEnabledHr from '../../hooks/useMailingEnabledHr';

export const AdminSettings = () => {
  const { isMailingEnabled, isMailingHrEnabled, parseFetchedSettings } = useSettingsStore();
  const isAdmin = useAuthentication(s => s.isAdmin);
  const {
    data: settings,
    isError: settingsIsError,
    error: settingsError,
    isFetching: isSettingsFetching,
  } = useSettings(isAdmin);

  const {
    data: mailingSwitched,
    isError: isMailingSwitchError,
    error: mailingSwitchError,
    isFetching: isMailingSwitchFetching,
    refetch: switchMailingLocal,
  } = useSwitchMailingLocal();

  const {
    data: mailingHrSwitched,
    isError: isMailingHrSwitchError,
    error: mailingHrSwitchError,
    isFetching: isMailingHrSwitchFetching,
    refetch: switchMailingHr,
  } = useMailingEnabledHr();

  useEffect(() => {
    settings && parseFetchedSettings(settings);
  }, [settings]);

  const onMailingEnabledSwitch = () => {
    switchMailingLocal();
  };

  const onMailingHrEnabledSwitch = () => {
    switchMailingHr();
  };


  return (
    <HStack
      w={'100%'}
      h={'100%'}
      justifyContent={'center'}
      alignItems={'start'}
      p={2}
      borderRadius={'10px 30px 30px 10px'}
      bg={'#385898'}
      color={'whiteAlpha.800'}
    >
      <VStack h={'100%'} w={'100%'}>
        <Text as={'em'} fontWeight={'700'} fontSize={'1.5rem'}>
          Ustawienia administratorskie
        </Text>
        <VStack h={'100%'} w={'100%'} mt={10}>
          <FormControl display='flex' alignItems='center'>
            <HStack w={'100%'}>
              <FormLabel flexBasis={'100%'} htmlFor='email-alerts' mb='0'>
                Mailing wewnętrzny
              </FormLabel>
              <Switch flexBasis={'50%'} id='email-alerts' isChecked={isMailingEnabled} onChange={onMailingEnabledSwitch}/>
            </HStack>
          </FormControl>
          <FormControl display='flex' alignItems='center'>
            <HStack w={'100%'}>
              <FormLabel flexBasis={'100%'} htmlFor='email-alerts' mb='0'>
                Mailing HR
              </FormLabel>
              <Switch flexBasis={'50%'} id='email-alerts' isChecked={isMailingHrEnabled} onChange={onMailingHrEnabledSwitch}/>
            </HStack>
          </FormControl>
        </VStack>
      </VStack>
    </HStack>
  );
};
