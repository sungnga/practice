import React, { useContext } from 'react';
import { TextField } from '@material-ui/core';

import useInputState from './hooks/useInputState';
import { TodosContext } from './contexts/TodosContext';

function EditTodoForm({ id, task, toggleEditForm }) {
	const [value, handleChange, reset] = useInputState(task);
	const { dispatch } = useContext(TodosContext);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				dispatch({ type: 'UPDATE', id: id, newTask: value });
				reset();
				toggleEditForm();
			}}
			style={{ marginLeft: '1rem', width: '50%' }}
		>
			<TextField
				value={value}
				onChange={handleChange}
				margin='normal'
				label='Edit task'
				fullWidth
				autoFocus
			/>
		</form>
	);
}

export default EditTodoForm;
