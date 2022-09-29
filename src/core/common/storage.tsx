type StorageReturnValue = {
  getItem: (key: string) => string;
  setItem: (key: string, value: string) => boolean;
  removeItem: (key: string) => void;
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

  const removeItem = (key: string): void => {
    if (isBrowser) {
      window['sessionStorage'].removeItem(key);
    }
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};

export default storage;