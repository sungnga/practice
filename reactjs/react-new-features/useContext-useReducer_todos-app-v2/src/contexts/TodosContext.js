import React, { createContext, useReducer } from 'react';
import todoReducer from '../reducers/todoReducer';

const defaultTodos = [
	{ id: 1, task: 'Mow the lawn', completed: false },
	{ id: 2, task: 'Make lunch', completed: true }
];

// Splitting into 2 contexts
// By doing so prevents unnecessary component re-rendering when context changes
// todos context manages todos state
// dispatch context manages the methods of todos
// Now whenever we want to subscribe to todos context/state, need to import TodosContext
// To subscribe to dispatch (the methods) context, need to import DispatchContext
export const TodosContext = createContext();
export const DispatchContext = createContext();

export function TodosProvider(props) {
	const [todos, dispatch] = useReducer(todoReducer, defaultTodos);

	// All child components have access to both TodosContext and DispatchContext Providers
	// To prevent unnecessary re-rendering, pass in todos and dispatch to value not as a new object, but as is
	//   not like this: value={{ todos }}
	// It's the only thing in the context
	return (
		<TodosContext.Provider value={ todos }>
			<DispatchContext.Provider value={ dispatch }>
				{props.children}
			</DispatchContext.Provider>
		</TodosContext.Provider>
	);
}
