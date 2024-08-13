export const formatDate = (dateTime: string): string => {
  const date = new Date(dateTime);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
