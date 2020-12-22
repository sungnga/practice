import React, { useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import useToggleState from './hooks/useToggleState';
import EditTodoForm from './EditTodoForm';
import { TodosContext } from './contexts/TodosContext';

function Todo({ task, completed, id }) {
	const [isEditing, toggle] = useToggleState(false);
	const { removeTodo, toggleTodo, updateTodo } = useContext(TodosContext);
	return (
		<ListItem style={{ height: '64px' }}>
			{isEditing ? (
				<EditTodoForm id={id} task={task} toggleEditForm={toggle} />
			) : (
				<>
					<Checkbox
						tabIndex={-1}
						checked={completed}
						onClick={() => toggleTodo(id)}
					/>
					<ListItemText
						style={{ textDecoration: completed ? 'line-through' : 'none' }}
					>
						{task}
					</ListItemText>
					<ListItemSecondaryAction>
						<IconButton onClick={() => removeTodo(id)}>
							<DeleteIcon aria-label='Delete' />
						</IconButton>
						<IconButton onClick={toggle}>
							<EditIcon aria-label='Edit' />
						</IconButton>
					</ListItemSecondaryAction>
				</>
			)}
		</ListItem>
	);
}

export default Todo;
