import axios from 'axios';
import { useRouter } from 'next/router';

// Receives query and comments as props from the getServerSideProps funct
export default function Post({ comments, query }) {
	return (
		<div>
			<h1>Comments for Post #{query.id}</h1>
			{comments.map((comment) => (
				<Comment {...comment} key={comment.id} />
			))}
		</div>
	);
}

// Receives comment object as props from Post parent component
// Destructuring email and body from comment
function Comment({ email, body }) {
	return (
		<div>
			<h5>{email}</h5>
			<p>{body}</p>
		</div>
	);
}

// Fetching comments based on postId
// getServerSideProps method automatically receives context object as an argument
// query is one of the properties of context object. Destructuring query
export async function getServerSideProps({ query }) {
	const res = await axios.get(
		`https://jsonplaceholder.typicode.com/comments?postId=${query.id}`
	);
	const { data } = res;
	return { props: { query: query, comments: data } };
}
