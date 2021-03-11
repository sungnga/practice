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
		<form onSubmit={onSubmit}>
			<input value={term} onChange={(e) => setTerm(e.target.value)} />
			<button>Search</button>
		</form>
	);
};

export default RepositoriesList;
