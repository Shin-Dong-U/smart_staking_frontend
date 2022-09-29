import storage from './storage';

export const checkLogin = (): boolean => {
  const user = storage().getItem('user');
  if (!user) {
    return false;
  }
  return true;
}

export const goLogin = (): void => {
  window.location.href = '/login';
}