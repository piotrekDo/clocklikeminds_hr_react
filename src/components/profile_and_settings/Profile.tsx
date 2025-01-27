import { FormControl, FormLabel, HStack, Spinner, Box, Text, VStack } from '@chakra-ui/react';
import useAuthentication from '../../state/useAuthentication';
import useUserData from '../../hooks/useUserData';
import useHttpErrorState from '../../state/useHttpErrorState';
import { useEffect } from 'react';
import useThemeState from '../../state/useThemeState';
import { Activebadge } from '../badges/Activebadge';
import { UserBadge } from '../badges/UserBadge';
import { AdminBadge } from '../badges/AdminBadge';
import { SupervisorBadge } from '../badges/SupervisorBadge';
import { determineSeniority } from '../../utils';
import { Freelancer } from '../badges/Freelancer';

export const Profile = () => {
  const user = useAuthentication(s => s.appUser);
  if (!user) return null;

  const theme = useThemeState(s => s.themeConfig);
  const { data, isError, error, isFetching } = useUserData(user.userId);
  const setError = useHttpErrorState(s => s.setError);

  useEffect(() => {
    isError && setError(error);
  }, [isError]);
  return (
    <VStack
      w={'100%'}
      maxW={'1200px'}
      h={'100%'}
      justifyContent={'start'}
      alignItems={'center'}
      py={2}
      borderRadius={'30px 10px 10px 30px'}
      color={theme.fontColor}
    >
      <Text as={'em'} fontWeight={'700'} fontSize={'1.8rem'}>
        Twój profil
      </Text>
      <VStack w={'100%'} mt={10}>
        {isFetching && <Spinner size={'xl'} />}

        {data && (
          <>
            <HStack fontSize={'1.6rem'} fontWeight={'700'} fontStyle={'italic'}>
              <Text>{data.firstName}</Text>
              <Text>{data.lastName}</Text>
              {data.freelancer && (
                <Box ml={3}>
                  <Freelancer size='2.5rem' />
                </Box>
              )}
            </HStack>
            <HStack>
              {data.active && <Activebadge />}
              <UserBadge />
              {data.userRoles.filter(r => r.roleName === 'supervisor').length === 1 && <SupervisorBadge />}
              {data.userRoles.filter(r => r.roleName === 'admin').length === 1 && <AdminBadge />}
            </HStack>
            <HStack w={'100%'} mt={5} px={10}>
              <HStack flexBasis={'50%'} align={'end'}>
                <Text fontStyle={'italic'} fontWeight={'700'} fontSize={'1.2rem'}>
                  Zatrudniony od:
                </Text>
                <Text>{data.hireStart}</Text>
              </HStack>
              <HStack flexBasis={'50%'} align={'end'}>
                <Text fontStyle={'italic'} fontWeight={'700'} fontSize={'1.2rem'}>
                  Koniec umowy:
                </Text>
                <Text>{data.hireEnd ? data.hireEnd : 'Umowa na czas nieokreślony'}</Text>
              </HStack>
            </HStack>
            <HStack w={'100%'} px={10}>
              <Text flexBasis={'50%'} fontWeight={'700'} fontSize={'1.2rem'}>
                {data.position ? data.position.displayName : ''}
              </Text>
              <HStack flexBasis={'50%'}>
                <Text fontStyle={'italic'} fontWeight={'700'} fontSize={'1.2rem'}>
                  Staż:{' '}
                </Text>
                <Text>{determineSeniority(data)}</Text>
              </HStack>
            </HStack>
            <HStack w={'100%'} px={10} mt={5}>
              <HStack flexBasis={'50%'} align={'end'}>
                <Text fontStyle={'italic'} fontWeight={'700'} fontSize={'1.2rem'}>
                  Mój manager:{' '}
                </Text>
                <Text>
                  {data.supervisorFirstName} {data.supervisorLastName}
                </Text>
              </HStack>
              <HStack flexBasis={'50%'}>
                <Text fontStyle={'italic'} fontWeight={'700'} fontSize={'1.2rem'}>Moje ID pracownika: </Text>
                <Text>{data.appUserId}</Text>
              </HStack>
            </HStack>
            {data.subordinates.length > 0 && (
              <>
                <Text mt={10} fontStyle={'italic'} fontWeight={'700'} fontSize={'1.2rem'}>Mój zespół</Text>
                <VStack w={'100%'}>
                  {data.subordinates.map(s => (
                    <HStack key={s.appUserId} w={'100%'} px={20}>
                      <HStack flexBasis={'50%'}>
                        <Text>{s.firstName}</Text>
                        <Text>{s.lastName}</Text>
                      </HStack>
                      <Text flexBasis={'50%'}>{s.position.displayName}</Text>
                    </HStack>
                  ))}
                </VStack>
              </>
            )}
          </>
        )}
      </VStack>
    </VStack>
  );
};
