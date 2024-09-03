import { isToday, isYesterday, format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  // Función auxiliar para formatear la hora en 12 horas
  const formatTime = (date) => {
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // la hora '0' debe ser '12'
    hours = String(hours).padStart(2, '0');
    return `${hours}:${minutes} ${ampm}`;
  };

  // Comprobar si la fecha es de hoy
  if (isToday(date)) {
    // Si es hoy, mostrar solo la hora
    return formatTime(date);
  } else if (isYesterday(date)) {
    // Si es ayer, mostrar "Ayer" y la hora
    return `Ayer, ${formatTime(date)}`;
  } else {
    // Si es otro día, mostrar la fecha en formato dd/MM (o dd/MM/yyyy si no es el año actual) y la hora
    if (date.getFullYear() === now.getFullYear()) {
      return `${format(date, 'dd/MM', { locale: es })}, ${formatTime(date)}`;
    } else {
      return `${format(date, 'dd/MM/yyyy', { locale: es })}, ${formatTime(date)}`;
    }
  }
};