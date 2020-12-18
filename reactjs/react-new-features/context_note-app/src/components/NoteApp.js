import React, { useEffect, useReducer } from 'react'
import NoteList from './NoteList'
import notesReducer from '../reducers/notes'
import AddNoteForm from './AddNoteForm'
import NotesContext from '../context/notes-context'

const NoteApp = () => {
    // const [notes, setNotes] = useState([]);
    // useReducer takes in a reducer function and a state
    // useReducer returns an array of state and dispatch
    const [notes, dispatch] = useReducer(notesReducer, [])
  
    useEffect(() => {
      const notes = JSON.parse(localStorage.getItem('notes'))
      
      if (notes) {
        dispatch({type: 'POPULATE_NOTES', notes})
        // setNotes(notesData)
      }
    }, [])
    
    useEffect(() => {
      // console.log('useEffect run')
      localStorage.setItem('notes', JSON.stringify(notes))
    }, [notes])
  
    return (
      <NotesContext.Provider value={{ notes, dispatch }}>
        <h1>Notes</h1>
            <NoteList />
            <AddNoteForm />
      </NotesContext.Provider>
    );
}

export { NoteApp as default }
  