import React, { useState, useContext, useEffect } from 'react'
import AddNote from './AddNote';
import NoteItem from './NoteItem';

// Context Imports
import noteContext from '../contexts/notes/noteContext'
import dialogContext from '../contexts/dialog/dialogContext';

// Dialog Imports
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from '@mui/material';

// Skeleton Imports
import { Card, CardContent, CardActions, Skeleton } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Notes = () => {
  // Using noteContext
  const { loading, notes, getNotes, deleteNote, setEdit} = useContext(noteContext);
  // Using dialogContext
  const { open, setOpen, dialogTitle, dialogId, setDialogTitle, setDialogId } = useContext(dialogContext);

  useEffect(() => {
    getNotes()
  },[])

  const handleDialogClose = () => {
    setOpen(false)
    setDialogTitle('')
    setDialogId('')
  }

  const handleDialogDelete = () => {
    deleteNote(dialogId)
    setDialogTitle('')
    setDialogId('')
    setEdit({
      _id: '',
      title: '',
      description: '',
      tag: ''
    })
    setOpen(false)
  }

  return (
    <>
      <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleDialogClose}
            aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure ?"}</DialogTitle>
        <DialogContent style={{paddingBottom: 10}}>
            <DialogContentText id="alert-dialog-slide-description">
                Are you sure to delete `{dialogTitle}` titled note ?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button varient="outlined" onClick={handleDialogClose}>Cancel</Button>
            <Button varient="outlined" onClick={handleDialogDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      <div>
        <h2>Your Notes</h2>
        <div className='your-notes'>
        {/* Set Loading In NoteState for AddNote, UpdateNote, DelteNote, getNote */}
        {loading && [1,2,3,4,5,6].map((index) =>
          <Card variant='outlined' key={index}>
              <CardContent>
                  <Skeleton />
                  <Skeleton />
              </CardContent>
              <CardActions style={{backgroundColor: '#dddee0', display: 'grid', gridTemplateColumns: '3fr 2fr', padding: '4px 8px'}}>
                  <div>
                    <Skeleton />
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <Skeleton />
                  </div>
              </CardActions>
          </Card>
        )}
        {(!loading && notes.length > 0) &&
          notes.map((note) => <NoteItem key={note._id} note={note}/>)
        }
        {(!loading && notes.length===0) &&
          <Card style={{width: '100%'}}>
            <CardContent>
              <h2>No Notes Found :(</h2>
            </CardContent>
          </Card>
        }
        </div>
      </div>
      <AddNote />
    </>
  )
}

export default Notes
