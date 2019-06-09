function Counter() {
  // Call useState passing initial value
  const state = React.useState(0);
  // It returns an array with two items...

  // 1st item is the current value
  const count = state[0];

  // 2nd item is the updater function
  const setCount = state[1];

  return <button>{count}</button>;
}
