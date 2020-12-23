import React, { useContext } from 'react';
import { TextField } from '@material-ui/core';

import useInputState from './hooks/useInputState';
import { DispatchContext } from './contexts/TodosContext';

function EditTodoForm({ id, task, toggleEditForm }) {
	const [value, handleChange, reset] = useInputState(task);
	// Note: we're not destructuring dispatch as an object
	const dispatch = useContext(DispatchContext);

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
