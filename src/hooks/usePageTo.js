import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';

function usePageTo() {
  const history = useHistory();
  return useCallback((path, query) => {
    let q = '';
    if (query) {
      Object.keys(query).forEach((key, index) => {
        q += `${index === 0 ? '?' : '&'}${key}=${query[key]}`;
      });
    }
    history.push(path + q);
  }, [history]);
}

export default usePageTo;
