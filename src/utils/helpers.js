//src/utils/helpers.js
export const formatDate = (dateString) => {
  const options = { hour: 'numeric', minute: 'numeric' }
  return new Date(dateString).toLocaleString(undefined, options)
}

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export const getUserAvatar = (data, path = 'users') => {
  console.log('data', data);
  console.log('path', path);
  const userData = getNestedValue(data, path);
  console.log('userData', userData);
  return userData?.photo_url || false;
}

export const getUserName = (data, path = 'users') => {
  const userData = getNestedValue(data, path);
  return userData?.full_name || 'Unknown User';
}
