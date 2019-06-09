import { useState, useEffect } from "react";

export const useLocalStorage = (key, defaultValue) => {
  const initialValue = () =>
    JSON.parse(
      window.localStorage.getItem(key) || JSON.stringify(defaultValue)
    );
  const [storage, updateStorage] = useState(initialValue);
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storage));
  }, [key, storage]);
  return [storage, updateStorage];
};
