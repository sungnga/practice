import React, { useContext } from 'react';
import useInputState from './hooks/useInputState';
import { TodosContext } from './contexts/todosContext';
import TextField from '@material-ui/core/TextField';

function EditTodoForm({ id, task, toggleEditForm }) {
	const { dispatch } = useContext(TodosContext);
	const [value, handleChange, reset] = useInputState(task);
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				dispatch({ type: 'EDIT', id: id, newTask: value });
				reset();
				toggleEditForm();
			}}
			style={{ marginLeft: '1rem', width: '50%' }}
		>
			<TextField
				value={value}
				onChange={handleChange}
				margin='normal'
				fullWidth
				autoFocus
			/>
		</form>
	);
}

export default EditTodoForm;
