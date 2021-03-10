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
