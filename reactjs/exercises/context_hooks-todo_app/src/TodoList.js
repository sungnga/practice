import React, { useContext } from 'react';
import Todo from './Todo';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { TodosContext } from './contexts/todosContext';

function TodoList() {
	const { todos } = useContext(TodosContext);
	if (todos.length)
		return (
			<Paper>
				<List>
					{todos.map((todo, i) => (
						<>
							<Todo {...todo} key={todo.id} />
							{i < todos.length - 1 && <Divider />}
						</>
					))}
				</List>
			</Paper>
		);
	return null;
}

export default TodoList;
