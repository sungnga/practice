import { Component } from 'react';

interface User {
	name: string;
	age: number;
}

// children props
interface UserSearchProps {
	users: User[];
}

interface UserSearchState {
	name: string;
	user: User | undefined;
}

class UserSearch extends Component<UserSearchProps> {
	state: UserSearchState = {
		name: '',
		user: undefined
	};

  onClick = () => {
    this.setState({name: ''})
		const foundUser = this.props.users.find((user) => {
			return user.name === this.state.name;
		});

		this.setState({ user: foundUser });
	};

	render() {
		const { name, user } = this.state;
		return (
			<div>
				<div>User Search</div>
				<input
					value={name}
					onChange={(e) => this.setState({ name: e.target.value })}
				/>
				<button onClick={this.onClick}>Find User</button>
				<div>
					{user && user.name} {user && user.age}
				</div>
			</div>
		);
	}
}

export default UserSearch;
