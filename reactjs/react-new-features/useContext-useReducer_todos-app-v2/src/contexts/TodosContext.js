// todos states
// all methods to interact with todos
import React, { createContext, useReducer } from 'react';
import useTodoState from '../hooks/useTodoState';
import todoReducer from '../reducers/todoReducer';

const defaultTodos = [
	{ id: 1, task: 'Mow the lawn', completed: false },
	{ id: 2, task: 'Make lunch', completed: true }
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
