import React from 'react';
import { TextField } from '@material-ui/core';
import useInputState from './hooks/useInputState';

function EditTodoForm({ id, task, updateTodo, toggleEditForm }) {
	const [value, handleChange, reset] = useInputState(task);
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				updateTodo(id, value);
				reset();
				toggleEditForm();
			}}
		>
			<TextField
				value={value}
				onChange={handleChange}
				margin='normal'
				label='Edit task'
				fullWidth
			/>
		</form>
	);
}

export default EditTodoForm;
