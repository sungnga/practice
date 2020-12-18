import React, { useState, useContext } from 'react';
import NotesContext from '../context/notes-context'

const AddNoteForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const { dispatch } = useContext(NotesContext)

    const addNote = (e) => {
        // To prevent a full page refresh
        e.preventDefault()
        dispatch({
            type: 'ADD_NOTE',
            title,
            body
        })
        // After note is submitted, clear the title input
        setTitle('')
        setBody('')
    }

	return (
		<div>
			<p>Add note</p>
			<form onSubmit={addNote}>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				></input>
				<textarea
					value={body}
					onChange={(e) => setBody(e.target.value)}
				></textarea>
				<button>add note</button>
			</form>
		</div>
	);
};

export { AddNoteForm as default };
