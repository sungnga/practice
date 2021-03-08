import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

// Interfaces in ts are used to define the structure of an object
// Define the type for each property of an object
interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

axios.get(url).then((response) => {
	// console.log(response.data)
	const todo = response.data as Todo;

	const id = todo.id;
	const title = todo.title;
	const completed = todo.completed;

	logTodo(id, title, completed);
});

const logTodo = (id: number, title: string, completed: boolean) => {
	console.log(`
    The Todo with ID: ${id}
    Has a title of: ${title}
    Is it finished? ${completed}
  `);
};
