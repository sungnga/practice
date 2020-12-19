import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

import TodoList from './TodoList';
import TodoForm from './TodoForm';

function TodoApp() {
	const initialTodos = [
		{ id: 1, task: 'Clean room', completed: false },
		{ id: 2, task: 'Wash dishes', completed: true },
		{ id: 3, task: 'Cook dinner', completed: false }
	];
	const [todos, setTodos] = useState(initialTodos);
	const addTodo = (newTodoText) => {
		setTodos([...todos, { id: 4, task: newTodoText, completed: false }]);
	};
	console.log(todos);
	return (
		<Paper
			style={{
				padding: 0,
				margin: 0,
				height: '100vh',
				background: '#fafafa'
			}}
			elevation={0}
		>
			<AppBar color='primary' position='static' style={{ height: '64px' }}>
				<Toolbar>
					<Typography color='inherit'>TODOS WITH HOOKS</Typography>
				</Toolbar>
			</AppBar>
			<Grid container justify='center' style={{marginTop: '1rem'}}>
				<Grid item xs={11} md={8} lg={4}>
					<TodoForm addTodo={addTodo} />
					<TodoList todos={todos} />
				</Grid>
			</Grid>
		</Paper>
	);
}

export default TodoApp;
