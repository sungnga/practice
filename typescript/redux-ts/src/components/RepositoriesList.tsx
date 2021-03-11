import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions';

const RepositoriesList: React.FC = () => {
	const [term, setTerm] = useState('');
	const { searchRepositories } = useActions();
	const { data, error, loading } = useSelector((state) => state.repositories);

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		searchRepositories(term);
		setTerm('');
	};
	return (
		<form onSubmit={onSubmit}>
			<input value={term} onChange={(e) => setTerm(e.target.value)} />
			<button>Search</button>
		</form>
	);
};

export default RepositoriesList;
