## React + Redux + Typescript

A mini app exercise using React, Redux, and Typescript together

### Initialize redux-ts project with create-react-app
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

### Setup reducer function and annotating the return type
- Create a RepositoriesState interface definition
- Assign the interface to the `state` argument of the reducer function. This means the state properties that the reducer function is receiving must be of type we've defined in the interface
- Annotate the return type of the reducer function to the RepositoriesState interface as well. This means for each property that we're returning, it must match the type that we've defined in the interface

### Typing action types, applying action interfaces in a reducer
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

### Refactoring our actions and action types into separate files
- Move the actions (with action interfaces) and action types (ActionType enum) into its separate files
- Then import them into the repositoriesReducer.ts file

### Adding action creators
- The action creator, searchRepositories(), will make a request to the NPM API with the provided search term. It does this by dispatching a SEARCH_REPOSITORIES action
- Use the axios library to make the request
- Add the request logic in a try/catch block
- Catch the error by dispatching the SEARCH_REPOSITORIES_ERROR action type
- Apply typings to dispatch function to make sure that we're dispatching the correct type of action in all of the different action creator. The possible actions that can be dispatched are found in the type Action (in actions folder)

### Combining reducers, creating a store, and setting up exports
- Combine all the reducers using the combineReducers function into one called `reducers`. At the moment we only have one reducer
- Now combine all the different parts into a redux store. Create a store by calling createStore()
- Next, create an index.ts file at the root of the state folder. This serves as the entry point where other components can go get access to action creators and store
- The last thing we need to do on the Redux side is exporting everything that we might need to get access to from other parts of our project into this index.ts file

### Initializing state in reducer function
- Create an initialState object and assign it to the `state` argument in the reducer function

### Wiring up Redux to React
- In src/components/App.tsx file:
  - Import the Provider component from react-redux
  - Import the store that we created
  - The Provider is a React component that we're going to use to get access to our Redux store
  - In the render section of App component, render the Provider component and pass in the store as store props. Now any components rendered inside the Provider component will have access to the store
  - Inside the Provider component render the RepositoriesList component
- Create the RepositoriesList component that renders a form which has an input field and a Search button