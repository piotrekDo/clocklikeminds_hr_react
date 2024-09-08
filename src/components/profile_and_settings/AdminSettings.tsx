import { FormControl, FormLabel, HStack, Switch, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import useSwitchMailing from '../../hooks/usemailingEnabledSwitch';
import useSettings from '../../hooks/useSettings';
import useAuthentication from '../../state/useAuthentication';
import useSettingsStore from '../../state/useSettingsState';
import { sortFns } from '@tanstack/react-query-devtools/build/lib/utils';

export const AdminSettings = () => {
  const { isMailingEnabled, parseFetchedSettings, updateMailingEnabled } = useSettingsStore();
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
    refetch: switchMailing,
  } = useSwitchMailing();

  useEffect(() => {
    settings && parseFetchedSettings(settings);
  }, [settings]);

  useEffect(() => {
    mailingSwitched !== undefined && updateMailingEnabled(mailingSwitched);
  }, [mailingSwitched]);

  const onMailingEnabledSwitch = () => {
    switchMailing();
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
                Mailing
              </FormLabel>
              <Switch flexBasis={'50%'} id='email-alerts' isChecked={isMailingEnabled} onChange={onMailingEnabledSwitch}/>
            </HStack>
          </FormControl>
        </VStack>
      </VStack>
    </HStack>
  );
};
