const initialState = { user: '' };

function userReducer(state, action) {
	switch (action.type) {
		case 'LOGIN_USER': {
			return {
				...state,
				user: action.payload.username
			};
		}
		case 'LOGOUT_USER': {
			return {
				...state,
				user: ''
			};
		}
		default:
			return state;
	}
}

const loginAction = { type: 'LOGIN_USER', payload: { username: 'Nga' } };
const logoutAction = { type: 'LOGOUT_USER' };

console.log(userReducer(initialState, logoutAction));
