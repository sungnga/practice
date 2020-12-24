const Post = ({ query }) => <h1>You are looking at post #{query.id}</h1>;

export async function getServerSideProps({ query }) {
	return { props: { query: query } };
}

export default Post;
