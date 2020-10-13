const users = [
	{
		id: '1',
		name: 'Nga',
		email: 'nga@example.com',
		age: 66
	},
	{
		id: '2',
		name: 'Sarah',
		email: 'sarah@example.com'
	},
	{
		id: '3',
		name: 'Mike',
		email: 'mike@example.com'
	}
];

// Demo post data
const posts = [
	{
		id: '10',
		title: 'GraphQL 101',
		body: 'A book about GraphQL',
		published: false,
		author: '1'
	},
	{
		id: '11',
		title: 'Nodejs Mastery',
		body: 'Advanced Node',
		published: true,
		author: '1'
	},
	{
		id: '12',
		title: 'Javascript',
		body: 'A book about Javascript',
		published: true,
		author: '2'
	}
];

const comments = [
	{
		id: '100',
		text: 'Great book!',
		author: '2',
		post: '12'
	},
	{
		id: '101',
		text: 'I learned a lot from this book',
		author: '3',
		post: '12'
	},
	{
		id: '102',
		text: 'The author did an amazing job of explaining complex concepts',
		author: '2',
		post: '10'
	},
	{
		id: '103',
		text: 'Love love this book',
		author: '1',
		post: '11'
	}
];

const db = {
	users,
	posts,
	comments
};

export { db as default };
