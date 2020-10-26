import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers/index';

const prisma = new Prisma({
	typeDefs: 'src/generated/prisma.graphql',
	endpoint: 'http://localhost:4466',
	secret: 'myveryverysecrettext',
	fragmentReplacements
});

export { prisma as default };

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
// prisma.mutation.createPost({
// 	data: {
// 		title: "A post from James",
// 		body: "",
// 		published: false,
// 		author: {
// 			connect: {
// 				id: "ckgckdkee003y0807rfr971c3"
// 			}
// 		}
// 	}
// }, '{id title body published author {name}}').then((data) => {
// 	console.log(data)
// 	return prisma.query.users(null, '{id name}')
// }).then((data) => {
// 	console.log(JSON.stringify(data, undefined, 2))
// })

// Goal: Update a post with mutations
// 1. Update the newly created post changing it's body and marking it as published
// 2. Fetch all posts (id, title, body, published) and print them to the console
// 3. View the list of posts and confirm that post did have it body and published values updated

// prisma.mutation.updatePost({
// 	where: {
// 		id: "ckgiu6ozv00l008075f5tpn81"
// 	},
// 	data: {
// 		title: "Change to published",
// 		body: "????????",
// 		published: true
// 	}
// }, '{id body published}').then((data) => {
// 	console.log(data)
// 	return prisma.query.posts(null, '{id title body published}')
// }).then((data) => {
// 	console.log(JSON.stringify(data, undefined, 2))
// }).catch(error => {
// 	console.log(error)
// })

// ------ Async/Await Function ------
// 1. Create a new post
// 2. Use prisma.exists to verify that the user exists
// 3. Fetch all of the info about the user (author)

// const createPostForUser = async (authorId, data) => {
// 	const userExists = await prisma.exists.User({ id: authorId });

// 	if (!userExists) {
// 		throw new Error('User not found');
// 	}

// 	const post = await prisma.mutation.createPost(
// 		{
// 			data: {
// 				...data,
// 				author: {
// 					connect: {
// 						id: authorId
// 					}
// 				}
// 			}
// 		},
// 		'{author {id name email posts {id title published}}}'
// 	);
// 	return post.author;
// };

// Calling the method
// createPostForUser('ckgcn8djy008b0807zznc12ld', {
// 	title: 'Great books to read',
// 	body: 'Drawing From the Right Side of the Brain',
// 	published: true
// })
// 	.then((user) => {
// 		console.log(JSON.stringify(user, undefined, 2));
// 	})
// 	.catch((error) => {
// 		console.log(error.message);
// 	});

//
// Goal: Use async/await with prisma bindings
//
// 1. Create "updatePostForUser" that accepts the post id and data to update
// 2. Update the post (get author id back)
// 3. Fetch the user associated with the updated post and return the user data
// 	- Grab the same fields grabbed for createPostForUser
// 4. Call the function with the id and data and use a then method call to get the user info
// 5. Print the user info to the console and test your work

// Async/await function
// const updatePostForUser = async (postId, data) => {
// 	const updatedPost = await prisma.mutation.updatePost(
// 		{
// 			where: {
// 				id: postId
// 			},
// 			data
// 		},
// 		'{author {id}}'
// 	);
// 	const user = await prisma.query.user(
// 		{
// 			where: {
// 				id: updatedPost.author.id
// 			}
// 		},
// 		'{id name email posts {id title published}}'
// 	);
// 	return user;
// };

// Calling the method
// updatePostForUser('ckgcm1sd700680807waza8p97', {
// 	published: true,
// 	title: 'Current books I am reading'
// }).then((user) => {
// 	console.log(JSON.stringify(user, undefined, 2));
// });

// ------ prisma.exists ------
// prisma.exists has one method for every type
// The name of the method is the name of the type. For example, User, Comment, Post
// These exists methods take a single object argument
// These exists methods return a promise and that promise resolves to a boolean value, true or false

// prisma.exists
// 	.Comment({
// 		id: 'ckgcnocva009o0807duxn01lj'
// 	})
// 	.then((exists) => {
// 		console.log(exists);
// 	});

//
// Goal: Improve the updatePostForUser function
//
// 1. Use prisma.exists to verify that the post exists
//	- If there is no post with that id, throw an error
// 2. Remove the unnecessary user query by updating the selection set for updatePost
// 3. Add a catch method call to catch and print errors
// 4. Test by updating an existing post and a non-existent post

// const updatePostForUser = async (postId, data) => {
// 	const postExists = await prisma.exists.Post({ id: postId });

// 	if (!postExists) {
// 		throw new Error('Post not found');
// 	}

// 	const updatedPost = await prisma.mutation.updatePost(
// 		{
// 			where: {
// 				id: postId
// 			},
// 			data
// 		},
// 		'{author {id name email posts {id title body published}}}'
// 	);
// 	return updatedPost.author;
// };

// Calling the method
// updatePostForUser('ckgcm1sd700680807waza8p97', {
// 	published: true,
// 	title: 'Books I enjoy reading',
// 	body: 'LiveWired'
// })
// 	.then((user) => {
// 		console.log(JSON.stringify(user, undefined, 2));
// 	})
// 	.catch((error) => {
// 		console.log(error.message);
// 	});
