import { HStack } from '@chakra-ui/react';
import { AdminSettings } from '../components/profile_and_settings/AdminSettings';
import { Profile } from '../components/profile_and_settings/Profile';
import useAuthentication from '../state/useAuthentication';

export const ProfilePage = () => {
  const isAdmin = useAuthentication(s => s.isAdmin);
  return (
    <HStack w={'100%'} h={'100%'} p={5}>
      <HStack w={'100%'} h={'100%'}>
        <Profile />
      </HStack>
      {isAdmin && (
        <HStack w={'500px'} h={'100%'}>
          <AdminSettings />
        </HStack>
      )}
    </HStack>
  );
};
