import { useState, useRef, useCallback } from 'react';

const useDebounce = (callback, delay) => {
  const timerRef = useRef();

  return useCallback(
    (...args) => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

export default useDebounce;
