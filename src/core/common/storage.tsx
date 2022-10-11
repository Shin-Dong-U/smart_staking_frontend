import { User } from "../model/User"

type StorageReturnValue = {
  getItem: (key: string) => string;
  setItem: (key: string, value: string) => boolean;
  removeItem: (key: string) => void;
  getUser: () => User | null;
};

const storage = (): StorageReturnValue => {
  
  const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

  const getItem = (key: string): string => {
    return isBrowser ? window['sessionStorage'][key] : '';
  };

  const setItem = (key: string, value: string): boolean => {
    if (isBrowser) {
      window['sessionStorage'].setItem(key, value);
      return true;
    }

    return false;
  };

  const getUser = (): User| null => {
    const user = getItem('user');
    try {
      return user ? JSON.parse(user) : null;
    } catch (e){
      return null;
    }
  }

  const removeItem = (key: string): void => {
    if (isBrowser) {
      window['sessionStorage'].removeItem(key);
    }
  };

  return {
    getItem,
    setItem,
    removeItem,
    getUser
  };
};

export default storage;