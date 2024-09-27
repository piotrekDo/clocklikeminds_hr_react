import { Flex } from '@chakra-ui/react';
import { EmployeeInfo } from '../../../model/User';
interface Props {
  employee: EmployeeInfo;
}
export const EmployeeCardBack = ({ employee }: Props) => {
  return (
    <Flex
      pos={'absolute'}
      w={'100%'}
      h={'100%'}
      borderRadius={'20px'}
      overflow={'hidden'}
      bg={'teal.600'}
      boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'}
      align={'center'}
      justify={'center'}
      fontSize={'2rem'}
      color={'white'}
      transform={'rotateY(180deg)'}
      style={{ backfaceVisibility: 'hidden' }}
    ></Flex>
  );
};
