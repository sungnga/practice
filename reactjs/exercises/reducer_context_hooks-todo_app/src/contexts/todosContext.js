import React, { createContext } from 'react';
import useTodoState from '../hooks/useTodoState';

const defaultTodos = [
	{ id: 1, task: 'Laundry', completed: false },
	{ id: 2, task: 'Clean room', completed: true }
];
export const TodosContext = createContext();

export function TodosProvider(props) {
	const todosStuff = useTodoState(defaultTodos);
	return (
		<TodosContext.Provider value={todosStuff}>
			{props.children}
		</TodosContext.Provider>
	);
}
