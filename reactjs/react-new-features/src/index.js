import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// A functional component
const BlogApp = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const addBlog = (e) => {
    e.preventDefault();
    setBlogs([
      ...blogs,
      {title, body}
    ])
    setTitle('')
    setBody('')
  }

  const removeBlog = (title) => {
    setBlogs(
      blogs.filter((blog) => blog.title !== title)
    )
  }

  console.log(blogs)
  return (
    <div>
      <h1>Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog.title}>
          <h1>{blog.title}</h1>
          <p>{blog.body}</p>
          <button onClick={() => removeBlog(blog.title)}>remove</button>
        </div>
      ))}
      <p>Add a blog</p>
      <form onSubmit={addBlog}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        <button>Add blog</button>
      </form>
    </div>
  )
}





// const NoteApp = () => {
  
//   // Notes started out as an empty array
//   const [notes, setNotes] = useState([]);
//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');

//   const addNote = (e) => {
//     // To prevent a full page refresh
//     e.preventDefault()
//     // Spread the existing notes, add a new note object
//     setNotes([
//       ...notes,
//       { title, body }
//     ])
//     // After note is submitted, clear the title input
//     setTitle('')
//     setBody('')
//   }
//   const removeNote = (title) => {
//     setNotes(notes.filter((note) => note.title !== title))
//   }

//   // Render notes data by iterating over notes array
//   return (
//     <div>
//       <h1>Notes</h1>
//       {notes.map((note) => {
//         return (
//           <div key={note.title}>
//             <h3>{note.title}</h3>
//             <p>{note.body}</p>
//             <button onClick={() => removeNote(note.title)}>remove</button>
//           </div>
//         )
//       })}
//       <p>Add note</p>
//       <form onSubmit={addNote}>
//         <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
//         <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
//         <button>add note</button>
//       </form>
//     </div>
//   );

// }



// Call useState multiple times to keep track of different things
// const App = (props) => {
//   // Returns an array of 2 items
//   const [count, setCount] = useState(props.count)
//   const [text, setText] = useState(props.text)

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

// App.defaultProps = {
//   count: 10
// }

ReactDOM.render(
  <React.StrictMode>
    <BlogApp />
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