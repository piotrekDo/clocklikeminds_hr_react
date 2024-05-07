import { Button, HStack } from '@chakra-ui/react';

interface Props {
  currentPage: number;
  pages: number;
  switchPage: (page: number) => void;
}

export const PaginationBar = ({ currentPage, pages, switchPage }: Props) => {
  const offset = Math.max(0, currentPage + 5 - pages);
  const start = Math.max(1, Math.max(1, currentPage - 5) - offset);
  const range = Array.from({ length: Math.min(pages, 11) }, (_, index) => index + start);

  return (
    <HStack w={'100%'} justifyContent={'center'}>
      <Button onClick={() => switchPage(0)}>Pierwsza</Button>
      <Button isDisabled={currentPage === 0} onClick={() => switchPage(currentPage - 1)}>
        Poprzednia
      </Button>
      {range.map((pageNumber, index) => (
        <Button key={index} onClick={() => switchPage(pageNumber -1)} colorScheme={currentPage === pageNumber -1 ? 'green' : 'gray'}>{pageNumber}</Button>
      ))}
      <Button isDisabled={currentPage >= pages - 1} onClick={() => switchPage(currentPage + 1)}>
        Następna
      </Button>
      <Button onClick={() => switchPage(pages - 1)}>Ostatnia</Button>
    </HStack>
  );
};
