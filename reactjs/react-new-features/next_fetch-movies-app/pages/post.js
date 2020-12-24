import { useRouter } from 'next/router';

export default function Post() {
	const router = useRouter();

	return <h1>You are looking at post #{router.query.id}</h1>;
}

// export async function getServerSideProps({ query }) {
// 	return { props: { query: query } };
// }
