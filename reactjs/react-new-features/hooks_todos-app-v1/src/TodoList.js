import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';

import Divider from '@material-ui/core/Divider';
import Todo from './Todo';

function TodoList({ todos, removeTodo, toggleTodo, updateTodo }) {
	if (todos.length)
		return (
			<Paper>
				<List>
					{todos.map((todo, i) => (
						<Fragment key={todo.id}>
							<Todo
								{...todo}
								key={todo.id}
								removeTodo={removeTodo}
								toggleTodo={toggleTodo}
								updateTodo={updateTodo}
							/>
							{i < todos.length - 1 && <Divider />}
						</Fragment>
					))}
				</List>
			</Paper>
		);
	return null;
}

export default TodoList;
