import { Badge } from '@chakra-ui/react';

export const UserBadge = () => {
  return (
    <Badge variant='subtle' colorScheme='green' boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'} as={'em'}>
      USER
    </Badge>
  );
};
