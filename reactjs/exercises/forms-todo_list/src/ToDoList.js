import React, { Component } from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import './TodoList.css';

class ToDoList extends Component {
	constructor(props) {
		super(props);
		this.state = { todos: [] };
		this.create = this.create.bind(this);
		this.remove = this.remove.bind(this);
		this.update = this.update.bind(this);
		this.toggleCompletion = this.toggleCompletion.bind(this);
	}
	create(newTodo) {
		this.setState({
			todos: [...this.state.todos, newTodo]
		});
	}
	// This will create and return a new array WITHOUT the item with the matching id
	remove(id) {
		this.setState({
			todos: this.state.todos.filter((todo) => todo.id !== id)
		});
	}
	// Takes in 2 args: the id of the task and the updated task being passed from the child component(Todo)
	// Map over the todos array and check for the matching id
	// If there's a match, override the task property with the updated task and put the updated task in the new array
	// If there's no match, return the todo as is in the new array
	update(id, updatedTask) {
		const updatedTodos = this.state.todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, task: updatedTask };
			}
			return todo;
		});
		// Set the todos property to the new updatedTodos array
		// REMEMBER, WE NEVER MUTATE THE STATE DIRECTLY!
		this.setState({ todos: updatedTodos });
	}
	// Map over the todos array
	// If the id matches, set the value of completed be the opposite
	toggleCompletion(id) {
		const updatedTodos = this.state.todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
		// Set the todos property to the new updatedTodos array
		// REMEMBER, WE NEVER MUTATE THE STATE DIRECTLY!
		this.setState({ todos: updatedTodos });
	}
	render() {
		const todos = this.state.todos.map((todo) => (
			<Todo
				key={todo.id}
				id={todo.id}
				task={todo.task}
				completed={todo.completed}
				removeTodo={this.remove}
				updateTodo={this.update}
				toggleTodo={this.toggleCompletion}
			/>
		));
		return (
			<div className='TodoList'>
				<h1>
					Todo List!
					<span>A Simple React Todo List App</span>
				</h1>
				<ul>{todos}</ul>
				<NewTodoForm createTodo={this.create} />
			</div>
		);
	}
}

export default ToDoList;
