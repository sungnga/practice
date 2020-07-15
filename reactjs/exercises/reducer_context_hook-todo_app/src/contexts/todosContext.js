import React, { createContext, useReducer } from 'react';
import todoReducer from '../reducers/todoReducer';

const defaultTodos = [
	{ id: 1, task: 'Laundry', completed: false },
	{ id: 2, task: 'Clean room', completed: true }
];
export const TodosContext = createContext();

export function TodosProvider(props) {
	const [todos, dispatch] = useReducer(todoReducer, defaultTodos);
	return (
		<TodosContext.Provider value={{ todos, dispatch }}>
			{props.children}
		</TodosContext.Provider>
	);
}
