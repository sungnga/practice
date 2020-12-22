import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

import TodoList from './TodoList';
import TodoForm from './TodoForm';
import useTodoState from './hooks/useTodoState';

function TodoApp() {
	const initialTodos = [{ id: 1, task: 'Pet a monkey', completed: false }];
	const { todos, addTodo, removeTodo, toggleTodo, updateTodo } = useTodoState(
		initialTodos
	);

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
			<Grid container justify='center' style={{ marginTop: '1rem' }}>
				<Grid item xs={11} md={8} lg={4}>
					<TodoForm addTodo={addTodo} />
					<TodoList
						removeTodo={removeTodo}
						todos={todos}
						toggleTodo={toggleTodo}
						updateTodo={updateTodo}
					/>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default TodoApp;

// NOTES:
// To clear window.localStage, in the devTools console, run: `localStorage.clear()`
// To see todos items in localStorage, run: `localStorage.getItem('todos')`
