import { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const RepositoriesList: React.FC = () => {
	const [term, setTerm] = useState('');
	const { searchRepositories } = useActions();
	// Return the entire repositories object from store
	// and destructure the properties inside it
	// Now these props are typed
	const { data, error, loading } = useTypedSelector(
		(state) => state.repositories
	);

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		searchRepositories(term);
		setTerm('');
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input value={term} onChange={(e) => setTerm(e.target.value)} />
				<button>Search</button>
			</form>
			{error && <h3>{error}</h3>}
			{loading && <h3>{loading}</h3>}
			{!error && !loading && data.map((name) => <div key={name}>{name}</div>)}
		</div>
	);
};

export default RepositoriesList;
