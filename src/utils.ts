export const trimText = (text: string, length: number): string => {
  if (length < 3) return '...';
    return text.substring(0, length - 3) + '...'
};
