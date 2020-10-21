import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
	typeDefs: 'src/generated/prisma.graphql',
	endpoint: 'http://localhost:4466'
});

// prisma.query prisma.mutation prisma.subscription prisma.exists

// prisma.query is an object and there are a set of methods we can use on this object
// The method name matches with the query name
// All of Prisma methods take 2 arguments:
// - 1st arg is the operation arg
// - 2nd arg is the selection set
// When using a Prisma method, what comes back is a promise. We need to use the then/catch method to wait for the promise to resolve
// This is an asynchronous operation. It takes time to make a request to the Prisma graphQL API and it takes time for Prisma to make a request to the underlying database
// Use the .then() method on the Prisma method and pass in a callback to handle the data that comes back
prisma.query.users(null, '{ id name email posts { id title } }').then((data) => {
	console.log(JSON.stringify(data, undefined, 2));
});

prisma.query.comments(null, '{ id, text, post {title} author {id name}}').then((data) => {
		console.log(JSON.stringify(data, undefined, 2));
	});
