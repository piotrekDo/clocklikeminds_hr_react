import { Badge } from '@chakra-ui/react';

export const AdminBadge = () => {
  return (
    <Badge variant='subtle' colorScheme='red' boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'} as={'em'}>
      ADMIN
    </Badge>
  );
};
