import { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * useLocalStorage persists a state value in localStorage under the given key.
 * It initializes from localStorage when available and updates storage whenever the value changes.
 */
function useLocalStorage(key, initialValue) {
  const readValue = () => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState(readValue);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota or JSON errors
    }
  }, [key, value]);

  // Sync value if localStorage changes in other tabs
  useEffect(() => {
    const handler = (e) => {
      if (e.key === key) {
        setValue(readValue());
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [key]);

  return [value, setValue];
}

export default useLocalStorage;
