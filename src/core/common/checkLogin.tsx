import useStorage from './storage';

export const checkLogin = (): boolean => {
  const user = useStorage().getItem('user');
  if (!user) {
    return false;
  }
  return true;
}

export const goLogin = (): void => {
  window.location.href = '/login';
}