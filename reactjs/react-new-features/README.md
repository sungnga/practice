# NOTES: REACT HOOKS AND CONTEXT
-------------------------------------

### USING CREATE REACT APP
- Create-react-app application is designed to get us up and running with a barebones react app quickly
- Install globally: `npm i -g create-react-app`
- To creat a React project: `create-react-app <nameOfProject>`
- It will generate a few things:
  - create a new directory
  - generate all the boilerplate files 
  - install all of the npm modules necessary
- cd into the project directory
- Run: `npm start`
- Create-react-app is using Babel configuration and Webpack configuration behind the scenes. These tools are abstracted away

### REACT HOOK
- A hook is nothing more than a function
- React hook is a function that lets you tap into react features, like state or lifecylce methods
- React ships with its own set of hooks we can use as building blocks and we can also create our own hooks, ie our own functions to customize behavior further
- So no longer are they called stateless functional component, they're now just called FUNCTIONAL COMPONENTS because it is possible to use state inside of them
useState is a hook function that we can call to allow us to use state inside a component

**useState:**
- Built-in React hook: useState is a function that allows us to use component state in our stateless functional components, something we could not do in the past
- useState manages component state
- In a functional component, state does not have to be an object. It can be a string, number, boolean, object, etc
```javascript
const array = useState(0)
<p> The current count is {array[0]}
```
- What comes back from useState is an array of two items:
  - the first is the current state value that's going to change over time
  - the second is a function we can call in order to update the state 
- It is common to destructure the array and give it a name for the item at that index: 
```javascript
const [count, setCount] = useState(0)
<p> The current count is {count}
```
- 4 pieces to useState:
  - define the state: useState(10)
  - get access to its current value: const [count, setCount]
  - render it: {count}
  - call the function to update the state: onClick={() => setCount(count + 1)}

**useState vs setState:**
- If you want to keep track of multiple states, you don't need to use a state object. You can just call useState multiple times on different things you want to keep track of
- Three things to note about state:
  1. State doesn't need to be an object with useState
  2. You can call useState as many times as you need in a given component for all of the different things you want to track
  3. when you are using useState and you update the state, it completely replaces what was there before as opposed to how state worked in the past with objects where the data was merged. This makes things less error prone and it allows us to break up our big state objects into individual values

**useEffect hook:**
- useEffect allows us to do something in functional components that we previously we not able to do: lifecycle methods in clase-based components
- Import: `import {useEffect} from 'react'`
- useEffect is something we call and we pass to it a function. And this function is similar to a combination of componentDidMount and componentDidUpdate
- It's going to run once right away and it's going to run after changes to your component state or props
- It's a useful tool to have because now we can do what we were able to do with lifecycle methods that we can do right in our functional components
```javascript
const [count, setCount] = useState(props.count)
useEffect(() => {
  console.log('useEffect ran')
  document.title = count
}, [count])
```
- What we've done using useEffect is we've allowed us to synchronize our props and our state with whatever we want to
- In this case, we are using it to sychronize the count state with the document title 

- **3 ways to use useEffect:**
1. If we don't pass in a dependency array as 2nd arg to useEffect, the function (1st arg) runs if anything changes at all
  - `useEffect(() => {...})`
2. We can optionally pass in a dependency array as a 2nd arg. In here, we can explicitly list out our dependencies to update or take into effect when their state changes
  - This means that the function (1st arg) runs once when the component first mounts and runs on updates for that list of dependencies 
  - `useEffect(() => {...}, [dependencies_array])`
3. We can provide a dependency array but leave it empty
  - This means the function (1st arg) runs once when the component first mounts, but never runs on updates
  - `useEffect(() => {...}, [])`

- We can call useEffect multiple times for each specific feature, each with their own set of dependencies
- In general, it's a good idea to provide the 2nd arg, because we should be explicity about what our effect depends on

```javascript
const App = (props) => {
  // Returns an array of 2 items
  const [count, setCount] = useState(props.count)
  const [text, setText] = useState('')

  useEffect(() => {
    console.log('This should only run once!')
  }, [])

  useEffect(() => {
    console.log('useEffect ran')
    document.title = count
  }, [count])

  return (
    <div>
      <p>The current {text || 'count'} is {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(props.count)}>reset</button>
      <input value={text} onChange={(e) => setText(e.target.value)}/>
    </div>
  )
}

App.defaultProps = {
  count: 10
}

Cleaning up Effects (similar to componentDidUnmount):
After an item is removed, we can unmount it by returning a function
  useEffect(() => {
    console.log('setting up effect')
    return () => {
      console.log('cleaning up')
    }
  }, [])
```

**The 3 main features of useEffect:**
1. registering the effect itself: 1st arg function
2. registering a cleanup function, which is optional
3. registering dependencies array, which is optional
This allows us to get similar behavior to what we had before, but this is a more ideal way
Being able to call useEffect multiple time with different dependencies allows us to keep complex components simple and easy to work with

**useReducer:**
1. First, we need to define a reducer function before we can call useReducer
  - This reducer function looks identical to the type of reducers we're already used to creating w/ Redux
```javascript  
const notesReducer = (state, action) => {
     switch (action.type) {
       case 'POPULATE_NOTES':
         return action.notes
       case 'ADD_NOTE':
         return [
           ...state,
           {title: action.title, body: action.body}
         ]
       case 'REMOVE_NOTE':
         return state.filter((note) => note.title !== action.title)
       default:
         return state
     }
   }
```
2. Then call the useReducer:
  - `const [notes, dispatch] = useReducer(notesReducer, [])`
  - useReducer takes in a reducer function and a state
  - useReducer returns an array of state and dispatch

3. Lastly, dispatch the action type:
```javascript
dispatch({
     type: 'ADD_NOTE',
     title,
     body
})
```

**Context API and useContext Hook:**
- Context provides a way to pass data through the component tree without having to pass props down manually at every level
- In a typical React application, data is psssed top-down (parent to child) via props, but this can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application
- Context provides a way to share values like these btwn components w/out having to explicitly pass a prop through every level of the tree

**1. To create a context (object):**
- Create a folder called context inside src directory. Create a notes-context.js in there
```javascript
import React from 'react'
const NotesContext = React.createContext()
export { NotesContext as default }
```
**2. To use the context:**
- The context object that's created above needs to be accessible in the component that's providing things and on the component that's consuming things
- That's why we have it in its own separate file

- **2A. In the component that provides the context:**
  - Import the context in NoteApp.js: `import NotesContext from '../context/notes-context'`
  - Render the context component as the main root tag in JSX and pass in the Provider property: `<NotesContext.Provider></NotesContext.Provider>`
  - With this in place, we are providing the context value to anyone in here and their children and children's children who wants to consume it
  - we do this by setting the value property as an object with a list of props that other components can have access to: `<NotesContext.Provider value={{ notes, dispatch }}></..>`
```javascript
return (
       <NotesContext.Provider value={{ notes, dispatch }}>
           <h1>Notes</h1>
           <NoteList />
           <AddNoteForm />
       </NotesContext.Provider>
);
```
- **2B. In the component that consumes the context:**
  - We use useContext hook to access the data
  - Import useContext Hook: `import React, { useContext } from 'react'`
  - Extract the props name you want to access the data, destructure it: `const { notes } = useContext(NotesContext)`
  - Then use the props as you like
  - Here's an example to access to the notes data using useContext hook:
```javascript
import React, { useContext } from 'react'
import NotesContext from '../context/notes-context'
const NoteList = () => {
    const { notes } = useContext(NotesContext)

    return (
        notes.map((note) => {
            return (
                <Note key={note.title} note={note} />
            )
        })
    )
}
```


# INSTRUCTIONS
---------------------
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
