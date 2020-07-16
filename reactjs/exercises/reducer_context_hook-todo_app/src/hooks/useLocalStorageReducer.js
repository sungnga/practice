import { useReducer, useEffect } from 'react';

function useLocalStorageReducer(key, defaultVal, reducer) {
	// The return value of the callback will be used as the initial state
	const [state, dispatch] = useReducer(reducer, defaultVal, () => {
		let value;
		try {
			value = JSON.parse(
				window.localStorage.getItem(key) || String(defaultVal)
			);
		} catch (e) {
			value = defaultVal;
		}
		return value;
	});
	// use useEffect to update localstorage when state changes
	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(state));
	}, [state]);

	return [state, dispatch];
}

export default useLocalStorageReducer;
