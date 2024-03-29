# React + Redux + Typescript

A mini app exercise using React, Redux, and Typescript together

### [Initialize redux-ts project with create-react-app](https://github.com/sungnga/practice/commit/98a01d8ea68a0e05b26efaf486a9bed5595a94ef?ts=2)
- To create project, run: `npx create-react-app redux-ts --template typescript --use-npm`
- Then install these packages: `npm i --save-exact @types/react-redux@7.1.15 axios@0.21.1 react-redux@7.2.2 redux@4.0.5 redux-thunk@2.3.0`

### Redux store design schema
- Redux store contains:
  - a piece of state called repositories (managed by the store reducer), which contains 3 properties
    - data - list of repositories from NPM
    - loading - true/false whether we are fetching data
    - error - string, error message if one occurred during fetch
- Action creators
  - searchRepositories(term)
  - We pass in the search term to this action creator
- Actions
  - The action creator will dispatch one of these actions to the store reducer to be processed
  - SearchRepositories
  - SearchRepositoriesSuccess
  - SearchRepositoriesError
  - Each action has an object which has a type and a payload property
- Action types
  - We have 3 possible actions so we need to create 3 different action types
  - 'search_repositories'
  - 'search_repositories_success'
  - 'search_repositories_error'

### [Setup reducer function and annotating the return type](https://github.com/sungnga/practice/commit/0bb30eb4a878909231da9c44fd2f931eef1a4c0c?ts=2)
- Create a RepositoriesState interface definition
- Assign the interface to the `state` argument of the reducer function. This means the state properties that the reducer function is receiving must be of type we've defined in the interface
- Annotate the return type of the reducer function to the RepositoriesState interface as well. This means for each property that we're returning, it must match the type that we've defined in the interface

### [Typing action types, applying action interfaces in a reducer](https://github.com/sungnga/practice/commit/0e645947bab14c6e014d224ab312476d5f535a45?ts=2)
- Every action object must have an action type property and optionally have a payload property. To indicate that it's optional, add a question mark after the property name
- Create 3 different action type interfaces that each describes a specific action that gets passed to the reducer function
- Then create a type Action enum containing the 3 possible actions. This represents all the different possible actions that can be processed by all the different reducers
- Assign the Action type enum to the action argument in reducer function. This means that the action object that the reducer receives as an argument must satisfy one of the three action type interfaces that we've defined
- Create an ActionType enum containing all the possible action types
- Use the ActionType enum in the switch case statement
- Use the ActionType enum in the 3 action interfaces that we define the type property
- A recap on how to setup a reducer with type:
  - Setup the reducer
  - Create an interface definition for state argument
  - Type the different action types with interfaces
  - Setup type Action that an action argument can take and apply it inside the reducer
  - Setup ActionType enum and make use of the enum inside the reducer and the action type interfaces

### [Refactoring our actions and action types into separate files](https://github.com/sungnga/practice/commit/271855d610d3ac20a31cc3bf639d700381f5094c?ts=2)
- Move the actions (with action interfaces) and action types (ActionType enum) into its separate files
- Then import them into the repositoriesReducer.ts file

### [Adding action creators](https://github.com/sungnga/practice/commit/979aca41d8ca7c202559bec3acf805a2f789a43c?ts=2)
- The action creator, searchRepositories(), will make a request to the NPM API with the provided search term. It does this by dispatching a SEARCH_REPOSITORIES action
- Use the axios library to make the request
- Add the request logic in a try/catch block
- Catch the error by dispatching the SEARCH_REPOSITORIES_ERROR action type
- Apply typings to dispatch function to make sure that we're dispatching the correct type of action in all of the different action creator. The possible actions that can be dispatched are found in the type Action (in actions folder)

### [Combining reducers, creating a store, and setting up exports](https://github.com/sungnga/practice/commit/715cfbdaefdd3e57d95c63d249b8f628bc35db22?ts=2)
- Combine all the reducers using the combineReducers function into one called `reducers`. At the moment we only have one reducer
- Now combine all the different parts into a redux store. Create a store by calling createStore()
- Next, create an index.ts file at the root of the state folder. This serves as the entry point where other components can go get access to action creators and store
- The last thing we need to do on the Redux side is exporting everything that we might need to get access to from other parts of our project into this index.ts file

### [Initializing state in reducer function](https://github.com/sungnga/practice/commit/c0be8453d209c491f25351b191d281e144aedf12?ts=2)
- Create an initialState object and assign it to the `state` argument in the reducer function

### [Wiring up Redux to React](https://github.com/sungnga/practice/commit/e4446ee27aaf5509652b498b6954e6324f1175ae?ts=2)
- In src/components/App.tsx file:
  - Import the Provider component from react-redux
  - Import the store that we created
  - The Provider is a React component that we're going to use to get access to our Redux store
  - In the render section of App component, render the Provider component and pass in the store as store props. Now any components rendered inside the Provider component will have access to the store
  - Inside the Provider component render the RepositoriesList component
- Create the RepositoriesList component that renders a form which has an input field and a Search button

### [Adding form submit event handler with type](https://github.com/sungnga/practice/commit/2b8d8830346d7ef9d828f48e3d0f3431b7703cba?ts=2)
- Create a piece of state called term and initialize it to an empty string
- Store the form input value in term state by calling setTerm()
- Create an onSubmit function to handle form submission. Prevent the default behavior of form submission

### [Creating a useActions hook](https://github.com/sungnga/practice/commit/02940b1ab9f406044c912c9f7575f6da5e711b0a?ts=2)
- This hook will automatically give us access to all the different action creators
- The bindActionCreators function is going to give us back an object that contains all the action creators that we provide as as the 1st arg. The 2nd arg that we pass in is the dispatch function

### [Getting and calling searchRepositories action creator with useActions hook](https://github.com/sungnga/practice/commit/10539ccdbdee8ca8aaf5ee798849305f41cc47d1?ts=2)
- In RepositoriesList.tsx component, get the searchRepositories action creator using useActions() hook
- Then in the onSubmit function, call the searchRepositories() action creator and pass in the term state as an argument. This action creator will make a request to NPM API to get the data based on the provided search term

### [Selecting state from Redux store](https://github.com/sungnga/practice/commit/a5f570a33599d1c4ef62b1d889747430d05265d3?ts=2)
- Use useSelector hook from react-redux to get access to the  states in the store
- We don't need to get all the states. The only state that we want is the repositories property. And we can destructure the three properties we want: data, loading, and error
- Now when we type in and submit a search term, we can see the result data is stored in the data array state

### [Defining the root state type](https://github.com/sungnga/practice/commit/674ad6ca7a9b16778171e2f2dc7131fea123d54a?ts=2)
- NOTE: TS doesn't know what the type of data is inside of Redux store. So we need to programmatically figure out what the type of our data is in the store and then communicate that information over to react-redux
- First, create a new type that describes the type of data inside of Redux store in reducers (combineReducers) file
  ```ts
  import { combineReducers } from 'redux';
  import repositoriesReducer from './repositoriesReducer';

  // reducers is a function
  const reducers = combineReducers({
    repositories: repositoriesReducer
  });

  export default reducers;

  // Assign the type of whatever reducers returns to RootState
  export type RootState = ReturnType<typeof reducers>;
  ```
  - `ReturnType` is a built-in helper inside of Typescript that says, take the function that we provide (reducers) and give us back the type of whatever that function returns. And we're going to assign that type to `RootState`
  - `RootState` is a type that describes the type of information inside of Redux store. And we need to export this type in state/index.ts file, so other components can have access to it

### [Creating a typed selector: useTypedSelector hook](https://github.com/sungnga/practice/commit/f448df7be6b0e87aba4e1fffbb05251ba8ccffce?ts=2)
- The useTypedSelector hook is a version of react-redux's useSelector hook but now with type. So when we use this hook to select a state in Redux store, the state is typed
- Use the useTypedSelector hook in the RepositoriesList component
- We only want the repositories object from the store and we can then destructure its properties
- Now the data array, error, and loading each has a type

### [Consuming store state](https://github.com/sungnga/practice/commit/d21e6ac36a703653eba3c9bb671a29ca0ba8439a?ts=2)
- Now we want to make use of the data, error, and loading in the JSX of our RepositoriesList component
  - Display error is there's an error
  - Display loading if it's loading
  - Display the data array if we have data

### [Big issues with Redux/React-Redux + Typescript](https://github.com/sungnga/practice/commit/06a602ab71a14293b879a031af215da38c922132?ts=2)
- Imports between files can turn into a mess very quickly. We resolved this by creating a single point of entry in index.ts in state folder. In this file, we exported the store, the action creators and the reducers. This way all the other components can access them from here
- Communicating types over to your components can be challenging. We need to write a bit of extra code to communicate the information about the structure of data inside of Redux store over to react-redux. The solution is to create a separate custom useSelector hook that has type
- Type def files for Redux, React-Redux, and others are possibly over-engineered. So reading those type definition files can be challenging