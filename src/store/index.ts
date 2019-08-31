import { useEffect, useState } from 'react';
import { createContainer } from './base';


function useLanguage(initLoaing: boolean = true) {
  const [isLoading, setIsLoading] = useState<boolean>(initLoaing);
  const toggleLoading = () => {
    setIsLoading(!isLoading);

  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);
  return {
    toggleLoading,
    isLoading,
  };
}

const Store = createContainer(useLanguage);

export default Store;
