import { combineReducers } from 'redux';
import repositoriesReducer from './repositoriesReducer';

// reducers is a function
const reducers = combineReducers({
	repositories: repositoriesReducer
});

export default reducers;

// Defining the root state type
// ReturnType is a built-in helper inside of Typescript
//  take the reducers function that we provide and
//  give us back the type of what reducers function returns
// Assign that type to `RootState`
export type RootState = ReturnType<typeof reducers>;
