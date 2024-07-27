import { format } from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'dd/MM/yyyy HH:mm');
};

export const formatDatePicker = (date: Date) => {
  const pad = (number: number) => (number < 10 ? '0' + number : number);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
