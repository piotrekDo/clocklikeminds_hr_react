import { HStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { AdminSettings } from '../components/profile_and_settings/AdminSettings';
import { Profile } from '../components/profile_and_settings/Profile';
import useAuthentication from '../state/useAuthentication';

export const ProfilePage = () => {
  const isAdmin = useAuthentication(s => s.isAdmin);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '-100px', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{
          width: '99%',
          height: '99%',
        }}
      >
        <HStack w={'100%'} h={'100%'} p={5} justify={'center'} align={'center'}>
          <HStack w={'100%'} h={'100%'} justify={'center'} align={'center'}>
            <Profile />
          </HStack>
          {isAdmin && (
            <HStack w={'500px'} h={'100%'}>
              <AdminSettings />
            </HStack>
          )}
        </HStack>
      </motion.div>
    </AnimatePresence>
  );
};
