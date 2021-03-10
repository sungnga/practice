import ReactDOM from 'react-dom';
// import GuestList from './state/GuestList';
// import UserSearch from './state/UserSearch'
import UserSearch from './classes/UserSearch';
// import EventComponent from './events/EventComponent';

const users = [
	{ name: 'Sarah', age: 20 },
	{ name: 'Alex', age: 20 },
	{ name: 'Michael', age: 20 }
];

const App = () => {
	return (
		<div>
			{/* <GuestList /> */}
			<UserSearch users={users} />
			{/* <EventComponent /> */}
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
