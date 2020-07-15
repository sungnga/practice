import { useState } from 'react';

function useToggle(initialVal = false) {
	// Call useState, "reserve piece of state"
	const [state, setState] = useState(initialVal);
	const toggle = () => {
		setState(!state);
	};
	// Return piece of state AND a function to toggle it
	return [state, toggle];
}

export default useToggle;
