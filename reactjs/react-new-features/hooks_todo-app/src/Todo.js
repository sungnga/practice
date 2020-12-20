import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import useToggleState from './hooks/useToggleState';
import EditTodoForm from './EditTodoForm';

function Todo({ task, completed, removeTodo, id, toggleTodo, updateTodo }) {
	const [isEditing, toggle] = useToggleState(false);
	return (
		<ListItem style={{height: '64px'}}>
			{isEditing ? (
				<EditTodoForm
					id={id}
					task={task}
					updateTodo={updateTodo}
					toggleEditForm={toggle}
				/>
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
