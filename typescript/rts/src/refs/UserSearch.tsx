import { useState, useRef, useEffect } from 'react';

const users = [
	{ name: 'Sarah', age: 20 },
	{ name: 'Alex', age: 20 },
	{ name: 'Michael', age: 20 }
];

const UserSearch: React.FC = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [name, setName] = useState('');
	// Define the types for possible values this state might hold
	const [user, setUser] = useState<{ name: string; age: number } | undefined>();

	useEffect(() => {
		// return early if inputRef isn't assigned to an element
		if (!inputRef.current) return;
		inputRef.current.focus();
	}, []);

	function onClick() {
		setName('');
		const foundUser = users.find((user) => {
			return user.name === name;
		});

		setUser(foundUser);
	}

	return (
		<div>
			<div>User Search</div>
			<input
				ref={inputRef}
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<button onClick={onClick}>Find User</button>
			<div>
				{user && user.name} {user && user.age}
			</div>
		</div>
	);
};

export default UserSearch;
