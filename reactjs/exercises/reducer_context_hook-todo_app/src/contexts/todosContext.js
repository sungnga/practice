import React, { createContext } from 'react';
import todoReducer from '../reducers/todoReducer';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';

const defaultTodos = [
	{ id: 1, task: 'Laundry', completed: false },
	{ id: 2, task: 'Clean room', completed: true }
];
export const TodosContext = createContext();
export const DispatchContext = createContext();

export function TodosProvider(props) {
	const [todos, dispatch] = useLocalStorageReducer(
		'todos',
		defaultTodos,
		todoReducer
	);
	// NOTE: when passing the 'todos' and 'dispatch' to the Providers, don't pass in as an object i.e value={{todos}} and value={{dispatch}}
	// This will cause re-render each time the state changes
	return (
		<TodosContext.Provider value={todos}>
			<DispatchContext.Provider value={dispatch}>
				{props.children}
			</DispatchContext.Provider>
		</TodosContext.Provider>
	);
}
