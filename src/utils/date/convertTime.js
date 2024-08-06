import { format, parseISO, isToday, isYesterday } from 'date-fns';

export function formatDate(dateString) {
  const date = parseISO(dateString);
  if (isToday(date)) {
    return format(date, 'hh:mm a');
  } else if (isYesterday(date)) {
    return 'Ayer'; 
  } else {
    return format(date, 'dd/MM/yyyy'); 
  }
}
