//src/utils/helpers.js
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export const getUserAvatar = (data, path = 'users') => {
  const userData = getNestedValue(data, path);
  return userData ? (userData.photo_url || userData) : false;
}

export const getUserName = (data, path = 'users') => {
  const userData = getNestedValue(data, path);
  return userData?.full_name || 'Unknown User';
}
