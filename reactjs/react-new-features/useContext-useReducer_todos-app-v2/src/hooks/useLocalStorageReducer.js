/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useEffect } from 'react';

function useLocalStorageReducer(key, defaultVal, reducer) {
  // The 3rd arg that gets passed in to useReducer is a function
  // that checks in localStorage if there exists a value based on the given key
  // If there is, use this value as the initial state
  // If there isn't, use the given defaultVal
	const [state, dispatch] = useReducer(reducer, defaultVal, () => {
		let val;
		try {
			val = JSON.parse(window.localStorage.getItem(key) || String(defaultVal));
		} catch (e) {
			val = defaultVal;
		}
		return val;
	});

  //use useEffect to update localStorage when state changes
  //note the dependencies array
	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(state));
	}, [state]);
	return [state, dispatch];
}

export { useLocalStorageReducer };

// NOTES:
// To clear window.localStage, in the devTools console, run: `localStorage.clear()`
// To see todos items in localStorage, run: `localStorage.getItem('todos')`
