//src/utils/helpers.js
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
  if (date.toDateString() === now.toDateString()) {
    // Si es hoy, solo mostrar la hora
    return formatTime(date);
  } else {
    // Si es otro día, mostrar la fecha completa
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleString('es-CO', options);
  }
};

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export const getUserAvatar = (data, path = 'users') => {
  //console.log('data', data);
  //console.log('path', path);
  const userData = getNestedValue(data, path);
  //console.log('userData', userData);
  return userData?.photo_url || false;
}

export const getUserName = (data, path = 'users') => {
  const userData = getNestedValue(data, path);
  return userData?.full_name || 'Unknown User';
}
