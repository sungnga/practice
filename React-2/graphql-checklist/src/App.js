import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_TODOS = gql`
	query getTodos {
		todos {
			done
			id
			text
		}
	}
`;

const TOGGLE_TODO = gql`
	mutation toggleTodo($id: uuid!, $done: Boolean!) {
		update_todos(where: { id: { _eq: $id } }, _set: { done: $done }) {
			returning {
				text
				id
				done
			}
		}
	}
`;

const ADD_TODO = gql`
	mutation addTodo($text: String!) {
		insert_todos(objects: { text: $text }) {
			returning {
				done
				id
				text
			}
		}
	}
`;

const DELETE_TODO = gql`
	mutation deleteTodo($id: uuid!) {
		delete_todos(where: { id: { _eq: $id } }) {
			returning {
				done
				id
				text
			}
		}
	}
`;

function App() {
	const [todoText, setTodoText] = useState('');
	const { data, loading, error } = useQuery(GET_TODOS);
	const [toggleTodo] = useMutation(TOGGLE_TODO);
	const [addTodo] = useMutation(ADD_TODO, {
		onCompleted: () => setTodoText('')
	});
	const [deleteTodo] = useMutation(DELETE_TODO);

	async function handleToggleTodo(todo) {
		const data = await toggleTodo({
			variables: { id: todo.id, done: !todo.done }
		});
		console.log('toggled todo', data);
	}

	async function handleAddTodo(event) {
		event.preventDefault();
		if (!todoText.trim()) return;
		const data = await addTodo({
			variables: { text: todoText },
			refetchQueries: [{ query: GET_TODOS }]
		});
		console.log('added todo', data);
		// setTodoText('')
	}

	async function handleDeleteTodo(todo) {
		const isConfirmed = window.confirm('Do you want to delete this todo?');
		if (isConfirmed) {
			const data = await deleteTodo({
				variables: { id: todo.id },
				update: (cache) => {
					const prevData = cache.readQuery({ query: GET_TODOS });
					const newTodos = prevData.todos.filter((t) => t.id !== todo.id);
					cache.writeQuery({ query: GET_TODOS, data: { todos: newTodos } });
				}
			});
			console.log('deleted todo', data);
		}
	}

	if (loading) return <div>Loading todos...</div>;
	if (error) return <div>Error fetching todos!</div>;

	return (
		<div className='vh-100 code flex flex-column items-center bg-purple white pa3 fl-1'>
			<h1 className='f2-l'>
				GraphQL Checklist{' '}
				<span role='img' aria-label='Checkmark'>
					✅
				</span>
			</h1>
			{/* Todo Form */}
			<form onSubmit={handleAddTodo} className='mb3'>
				<input
					className='pa2 f4 b--dashed'
					type='text'
					placeholder='Write your todo'
					onChange={(event) => setTodoText(event.target.value)}
					value={todoText}
				/>
				<button className='pa2 f4 bg-green white' type='submit'>
					Create
				</button>
			</form>
			{/* Todo List */}
			<div className='flex flex-column items-center justify-center'>
				{data.todos.map((todo) => (
					<p onDoubleClick={() => handleToggleTodo(todo)} key={todo.id}>
						<span className={`pointer list pa1 f3 ${todo.done && 'strike'}`}>
							{todo.text}
						</span>
						<button
							onClick={() => handleDeleteTodo(todo)}
							className='bg-transparent pointer bn f4'
						>
							<span className='red'>&times;</span>
						</button>
					</p>
				))}
			</div>
		</div>
	);
}

export default App;
