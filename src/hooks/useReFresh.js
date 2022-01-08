import { useState } from 'react';

function useReFresh() {
  const [key, setKey] = useState(false);
  const reset = () => {
    setKey(!key);
  };
  return { flag: key, reset };
}

export default useReFresh;
