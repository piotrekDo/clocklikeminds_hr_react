import { Box, Flex, HStack, Text, VStack , Image } from '@chakra-ui/react';
import { FaRegCircleUser } from 'react-icons/fa6';
import { EmployeeInfo } from '../../../model/User';
import { EmployeeCardPosition } from './EmployeeCardPosition';
import { TimeOffStatusBadge } from './TimeOffStatusBadge';
import java_logo from '../../../assets/logo_java.png'
import pega_logo from '../../../assets/pega_logo.png'
import { Freelancer } from '../../badges/Freelancer';

interface Props {
  employee: EmployeeInfo;
}

export const EmployeeCardFront = ({ employee }: Props) => {
  const isJava = employee.position && employee.position.positionKey.indexOf('java') > -1
  const isPega = employee.position && employee.position.positionKey.indexOf('pega') > -1

  const bg = `
  linear-gradient(
    80deg,
    hsl(240deg 100% 20%) 0%,
    hsl(214deg 100% 23%) 8%,
    hsl(207deg 100% 26%) 15%,
    hsl(204deg 100% 29%) 22%,
    hsl(201deg 100% 32%) 29%,
    hsl(200deg 100% 34%) 36%,
    hsl(198deg 100% 36%) 43%,
    hsl(197deg 100% 38%) 50%,
    hsl(197deg 100% 40%) 58%,
    hsl(196deg 100% 42%) 65%,
    hsl(196deg 100% 44%) 72%,
    hsl(195deg 100% 45%) 79%,
    hsl(195deg 100% 47%) 86%,
    hsl(194deg 100% 48%) 93%,
    hsl(194deg 100% 50%) 100%
  )
  `
  return (
    <VStack
      pos={'absolute'}
      w={'100%'}
      h={'100%'}
      borderRadius={'20px'}
      overflow={'hidden'}
      bgImage={bg}
      boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}
      style={{ backfaceVisibility: 'hidden' }}
    >
      {employee.freelancer && <Box position={'absolute'} top={0} right={2}><Freelancer size='5rem'/></Box>}
      <Flex zIndex={0} position={'absolute'} right={0} top={-1} w={'70%'} h={'50%'} overflow={'hidden'}>
        {employee.imageUrl ? (
          <img
            src={employee.imageUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '0 0 0 50%',
              opacity: 0.4,
              filter: 'blur(2px)',
            }}
            referrerPolicy='no-referrer'
          />
        ) : (
          <FaRegCircleUser filter='blur(2px)' opacity={.4} size={'100%'} />
        )}
      </Flex>
      <VStack w={'100%'} zIndex={2} spacing={0}>
        <VStack w={'90%'} align={'start'} fontSize={'1.8rem'} color={'wheat'} fontWeight={'700'} pt={5} spacing={0}>
          <Text>{employee.firstName}</Text>
          <Text>{employee.lastName}</Text>
        </VStack>
        <HStack fontSize={'1.2rem'} color={'whiteAlpha.800'} fontWeight={'700'} w={'90%'}>
          <EmployeeCardPosition position={employee.position} />
        </HStack>
        <VStack w={'100%'} px={3} spacing={0}>
          <HStack w={'100%'} justify={'space-between'} align={'end'} spacing={0} mt={5}>
            <Text fontSize={'.8rem'} color={'whiteAlpha.800'} fontWeight={'700'}>
              Dni naliczone
            </Text>
            <Text fontSize={'1.2rem'} color={'wheat'} fontWeight={'700'}>
              {employee.ptoDaysAccruedCurrentYear + employee.ptoDaysAccruedLastYear}
            </Text>
          </HStack>
          <VStack w={'100%'} justify={'space-between'} align={'end'} spacing={0}>
            <HStack w={'70%'} justify={'space-between'} align={'end'} spacing={0}>
              <Text fontSize={'.7rem'} color={'whiteAlpha.800'} fontWeight={'700'}>
                w bieżącym roku
              </Text>
              <Text fontSize={'.9rem'} color={'wheat'} fontWeight={'700'}>
                {employee.ptoDaysAccruedCurrentYear}
              </Text>
            </HStack>
            <HStack w={'70%'} justify={'space-between'} align={'end'} spacing={0}>
              <Text fontSize={'.7rem'} color={'whiteAlpha.800'} fontWeight={'700'}>
                w poprzednim roku
              </Text>
              <Text fontSize={'.9rem'} color={'wheat'} fontWeight={'700'}>
                {employee.ptoDaysAccruedLastYear}
              </Text>
            </HStack>
          </VStack>
        </VStack>
        <VStack w={'100%'} px={3} mt={3} spacing={0}>
          <HStack w={'100%'} justify={'space-between'} align={'end'}>
            <Text fontSize={'.8rem'} color={'whiteAlpha.800'} fontWeight={'700'}>
              Wykorzystane
            </Text>
            <Text fontSize={'1.2rem'} color={'wheat'} fontWeight={'700'}>
              {employee.ptoDaysTaken}
            </Text>
          </HStack>
          <HStack w={'100%'} justify={'space-between'} align={'end'}>
            <Text fontSize={'.8rem'} color={'whiteAlpha.800'} fontWeight={'700'}>
              Pozostałe
            </Text>
            <Text fontSize={'1.2rem'} color={'wheat'} fontWeight={'700'}>
              {employee.ptoDaysAccruedCurrentYear + employee.ptoDaysAccruedLastYear - employee.ptoDaysTaken}
            </Text>
          </HStack>
        </VStack>
      </VStack>
      {/* {isJava && <Image pos={'absolute'} bottom={'20px'} left={'-30px'} opacity={.4} src={java_logo} objectFit={'cover'} boxSize={'180px'} />}
      {isPega && <Image pos={'absolute'} bottom={'30px'} left={'10px'} opacity={.4} src={pega_logo} objectFit={'fill'} boxSize={'150px'} />} */}
      <Box w={'100%'} pos={'absolute'} bottom={0}>
        <TimeOffStatusBadge employee={employee}/>
      </Box>
    </VStack>
  );
};
