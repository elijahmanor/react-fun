import { useState, useEffect, useReducer } from "react";

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

export const useReducerWithLocalStorage = (reducer, key, defaultValue) => {
  const initialValue = () => {
    return JSON.parse(
      window.localStorage.getItem(key) || JSON.stringify(defaultValue)
    );
  };
  const [state, dispatch] = useReducer(reducer, defaultValue, initialValue);
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, dispatch];
};
