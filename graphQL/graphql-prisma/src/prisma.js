import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
	typeDefs: 'src/generated/prisma.graphql',
	endpoint: 'http://localhost:4466'
});

// prisma.query prisma.mutation prisma.subscription prisma.exists

// ------ prisma.query ------
// prisma.query is an object and there are a set of methods we can use on this object
// The method name matches with the query name
// All of Prisma methods take 2 arguments:
// - 1st arg is the operation arg
// - 2nd arg is the selection set
// When using a Prisma method, what comes back is a promise. We need to use the then/catch method to wait for the promise to resolve
// This is an asynchronous operation. It takes time to make a request to the Prisma graphQL API and it takes time for Prisma to make a request to the underlying database
// Use the .then() method on the Prisma method and pass in a callback to handle the data that comes back

// prisma.query.users(null, '{ id name email posts { id title } }').then((data) => {
// 	console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.query.comments(null, '{ id, text, post {title} author {id name}}').then((data) => {
// 		console.log(JSON.stringify(data, undefined, 2));
// 	});

// prisma.query.posts(null, '{ id, title}').then((data) => {
// 		console.log(JSON.stringify(data, undefined, 2));
// 	});

// ------ prisma.mutation ------
// All of the available methods to use can be found in prisma.graphql file
// The Prisma method used on the prisma.mutation object takes 2 arguments:
// - 1st arg is the operation. This is an object we provide
// - 2nd arg is the selection set

// Promise chaining:
prisma.mutation.createPost({
	data: {
		title: "A post from James",
		body: "",
		published: false,
		author: {
			connect: {
				id: "ckgckdkee003y0807rfr971c3"
			}
		}
	}
}, '{id title body published author {name}}').then((data) => {
	console.log(data)
	return prisma.query.users(null, '{id name}')
}).then((data) => {
	console.log(JSON.stringify(data, undefined, 2))
})


// Goal: Mess around with mutations
// 1. Update the newly created post changing it's body and marking it as published
// 2. Fetch all posts (id, title, body, published) and print them to the console
// 3. View the list of posts and confirm that post did have it body and published values updated

prisma.mutation.updatePost({
	where: {
		id: "ckgiu6ozv00l008075f5tpn81"
	},
	data: {
		title: "Change to published",
		body: "????????",
		published: true
	}
}, '{id body published}').then((data) => {
	console.log(data)
	return prisma.query.posts(null, '{id title body published}')
}).then((data) => {
	console.log(JSON.stringify(data, undefined, 2))
}).catch(error => {
	console.log(error)
})