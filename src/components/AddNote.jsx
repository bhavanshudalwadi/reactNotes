import React, { useState, useEffect, useContext } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
// Contexts
import noteContext from '../contexts/notes/noteContext'
import dialogContext from '../contexts/dialog/dialogContext';

const AddNote = () => {
    const { error, edit, setEdit, addNote, updateNote, setError } = useContext(noteContext);

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tag, setTag] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(edit._id!==''){
            updateNote(title, description, tag)
            clearForm()
        }else {
            addNote(title, description, tag)
            clearForm()
        }
    }

    const clearForm = () => {
        if(title.length!==0 && description.length!==0) {
            setTitle('')
            setDescription('')
            setTag('')
            setEdit({
                _id: '',
                title: '',
                description: '',
                tag: ''
            })
            setError({
                error: '',
                emptyFields: [],
                invalidFields: []
            })
        }
    }

    useEffect(()=>{
        setTitle(edit.title)
        setDescription(edit.description)
        setTag(edit.tag)
    },[edit])

    // const [note, setNote] = useState({
    //     title: '',
    //     description: '',
    //     tag: ''
    // })
    // const handleOnChange = (e) => {
    //     setNote({...note, [e.target.name]: e.target.value})
    // }

    return (
            <div className='add-note' style="background-color: #fff; color: #000;">
                {edit._id!==''?(<h2>Update Note</h2>):(<h2>Add New Note</h2>)}
                <form id="add-note">
                    <TextField
                        fullWidth
                        style={{marginBottom: 8}}
                        id="txt-title"
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        error={error.emptyFields.includes('title') && title.length===0}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        id="txtmulti-description"
                        label="Description"
                        variant="outlined"
                        multiline
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        required
                        error={error.emptyFields.includes('description') && description.length===0}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        id="txt-tag"
                        label="Tag (Optional)"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        variant="outlined"
                    />
                    {edit._id!=='' &&
                    <Button 
                        style={{width: '48%', marginTop: 16, marginRight: 5, fontSize: 18}}
                        variant="outlined"
                        onClick={clearForm}
                    >
                        Cancel
                    </Button>}
                    <Button
                        style={{width: edit._id!==''?'50%':'100%', marginTop: 16, marginLeft: edit._id!==''?'8':'0', fontSize: 18}}
                        variant="outlined"
                        onClick={handleSubmit}
                    >
                        {edit._id!==''?'Update Note':'Add Note'}
                    </Button>
                    {error.error.length!==0 && (title.length===0 || description.length ===0) && <h4 className='error'>{error.error}</h4>}
                </form>    
            </div>
    )
}

export default AddNote
