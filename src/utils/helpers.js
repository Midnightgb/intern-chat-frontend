//src/utils/helpers.js
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export const getUserAvatar = (data, path = 'users') => {
  console.log('data getUserAvatar:', data);
  console.log('path:', path);
  if (path === 'users_send') {
    console.log('el path es users_send');
    
    if (!getNestedValue(data, path)) {
      console.log('no hay datos en users_send');
      path = 'user';
      console.log('cambiando el path a user');
    }
  }
  const userData = getNestedValue(data, path);
  console.log('userData:', userData);
  return userData ? (userData.photo_url || userData) : false;
}

export const getUserName = (data, path = 'users') => {
  console.log('data getUserName:', data);
  console.log('path:', path);
  if (path === 'users_send') {
    console.log('el path es users_send');
    
    if (!getNestedValue(data, path)) {
      console.log('no hay datos en users_send');
      path = 'user';
      console.log('cambiando el path a user');
    }
  }
  const userData = getNestedValue(data, path);
  return userData?.full_name || 'Unknown User';
}
