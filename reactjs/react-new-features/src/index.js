import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addNote = (e) => {
    // To prevent a full page refresh
    e.preventDefault()
    // Spread the existing notes, add a new note object
    setNotes([
      ...notes,
      { title, body }
    ])
    // After note is submitted, clear the title input
    setTitle('')
    setBody('')
  }

  const removeNote = (title) => {
    setNotes(notes.filter((note) => note.title !== title))
  }

  useEffect(() => {
    const notesData = JSON.parse(localStorage.getItem('notes'))
    
    if (notesData) {
      setNotes(notesData)
    }
  }, [])
  
  useEffect(() => {
    // console.log('useEffect run')
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  // Render notes data by iterating over notes array
  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => {
        return (
          <Note key={note.title} note={note} removeNote={removeNote}/>
        )
      })}
      <p>Add note</p>
      <form onSubmit={addNote}>
        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        <button>add note</button>
      </form>
    </div>
  );
}

const Note = ({ note, removeNote }) => {
  useEffect(() => {
    console.log('setting up effect')
    return () => {
      console.log('cleaning up')
    }
  }, [])
  return (
    <div>
      <p>{note.body}</p>
      <h3>{note.title}</h3>
      <button onClick={() => removeNote(note.title)}>remove</button>
    </div>
  )
}



ReactDOM.render(
  <React.StrictMode>
    <NoteApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();




// ========================
// NOTES
// ========================

// USING CREATE REACT APP
// Create-react-app application is designed to get us up and running with a barebones react app quickly
// Install globally: npm i -g create-react-app
// To creat a React project: create-react-app <nameOfProject>
// It will generate a few things:
//  - create a new directory
//  - generate all the boilerplate files 
//  - install all of the npm modules necessary
// cd into the project directory
// Run: npm start
// Create-react-app is using Babel configuration and Webpack configuration behind the scenes. These tools are abstracted away

// REACT HOOK
// A hook is nothing more than a function
// React hook is a function that lets you tap into react features, like state or lifecylce methods
// React ships with its own set of hooks we can use as building blocks and we can also create our own hooks, ie our own functions to customize behavior further
// So no longer are they called stateless functional component, they're now just called FUNCTIONAL COMPONENTS because it is possible to use state inside of them
// useState is a hook function that we can call to allow us to use state inside a component

// useState:
// Built-in React hook: useState is a function that allows us to use component state in our stateless functional components, something we could not do in the past
// useState manages component state
// In a functional component, state does not have to be an object. It can be a string, number, boolean, object, etc
  // const array = useState(0)
  // <p> The current count is {array[0]}
// What comes back from useState is an array of two items:
//  - the first is the current state value that's going to change over time
//  - the second is a function we can call in order to update the state 
// It is common to destructure the array and give it a name for the item at that index: 
  // const [count, setCount] = useState(0)
  // <p> The current count is {count}
// 4 pieces to useState:
//  - define the state: useState(10)
//  - get access to its current value: const [count, setCount]
//  - render it: {count}
//  - call the function to update the state: onClick={() => setCount(count + 1)}

// useState vs setState:
// If you want to keep track of multiple states, you don't need to use a state object. You can just call useState multiple times on different things you want to keep track of
// Three things to note about state:
// 1. State doesn't need to be an object with useState
// 2. You can call useState as many times as you need in a given component for all of the different things you want to track
// 3. when you are using useState and you update the state, it completely replaces what was there before as opposed to how state worked in the past with objects where the data was merged. This makes things less error prone and it allows us to break up our big state objects into individual values

// useEffect hook:
// useEffect allows us to do something in functional components that we previously we not able to do: lifecycle methods in clase-based components
// Import: {useEffect} from 'react';
// useEffect is something we call and we pass to it a function. And this function is similar to a combination of componentDidMount and componentDidUpdate
// It's going to run once right away and it's going to run after changes to your component state or props
// It's a useful tool to have because now we can do what we were able to do with lifecycle methods that we can do right in our functional components

// const [count, setCount] = useState(props.count)
// useEffect(() => {
//   console.log('useEffect ran')
//   document.title = count
// }, [count])
// What we've done using useEffect is we've allowed us to synchronize our props and our state with whatever we want to
// In this case, we are using it to sychronize the count state with the document title 

// 3 ways to use useEffect:
// 1. If we don't pass in a dependency array as 2nd arg to useEffect, the function (1st arg) runs if anything changes at all
//  - useEffect(() => {})
// 2. We can optionally pass in a dependency array as a 2nd arg. In here, we can explicitly list out our dependencies to update or take into effect when their state changes
//  - This means that the function (1st arg) runs once when the component first mounts and runs on updates for that list of dependencies 
//  - useEffect(() => {}, [dependencies_array])
// 3. We can provide a dependency array but leave it empty
//  - This means the function (1st arg) runs once when the component first mounts, but never runs on updates
//  - useEffect(() => {}, [])

// We can call useEffect multiple times for each specific feature, each with their own set of dependencies
// In general, it's a good idea to provide the 2nd arg, because we should be explicity about what our effect depends on


// const App = (props) => {
//   // Returns an array of 2 items
//   const [count, setCount] = useState(props.count)
//   const [text, setText] = useState('')

//   useEffect(() => {
//     console.log('This should only run once!')
//   }, [])

//   useEffect(() => {
//     console.log('useEffect ran')
//     document.title = count
//   }, [count])

//   return (
//     <div>
//       <p>The current {text || 'count'} is {count}</p>
//       <button onClick={() => setCount(count + 1)}>+1</button>
//       <button onClick={() => setCount(count - 1)}>-1</button>
//       <button onClick={() => setCount(props.count)}>reset</button>
//       <input value={text} onChange={(e) => setText(e.target.value)}/>
//     </div>
//   )
// }
//
// App.defaultProps = {
//   count: 10
// }

// Cleaning up Effects (similar to componentDidUnmount):
// After an item is removed, we can unmount it by returning a function
  // useEffect(() => {
  //   console.log('setting up effect')
  //   return () => {
  //     console.log('cleaning up')
  //   }
  // }, [])

// The 3 main features of useEffect:
// 1. registering the effect itself: 1st arg function
// 2. registering a cleanup function, which is optional
// 3. registering dependencies array, which is optional
// This allows us to get similar behavior to what we had before, but this is a more ideal way
// Being able to call useEffect multiple time with different dependencies allows us to keep complex components simple and easy to work with