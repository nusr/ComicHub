import { useEffect, useState } from 'react';
import { createContainer } from './base';

function useLanguage(
  initLoading = true
): {
    toggleLoading: () => void;
    isLoading: boolean;
  } {
  const [isLoading, setIsLoading] = useState<boolean>(initLoading);
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
