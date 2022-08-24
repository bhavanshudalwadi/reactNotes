import React, {useContext} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import IconButton from '@mui/material/IconButton';

// Contexts
import noteContext from '../contexts/notes/noteContext'
import dialogContext from '../contexts/dialog/dialogContext';

// date-fns Imports
import { formatDistanceToNow } from 'date-fns'

const NoteItem = ({ note }) => {
    const {_id, title, description, tag, date} = note

    const { setEdit } = useContext(noteContext);
    const { setOpen, setDialogTitle, setDialogId } = useContext(dialogContext);

    const handleEdit = () => {
        setEdit({_id, title, description, tag})
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const handleDelete = () => {
        setDialogTitle(title)
        setDialogId(_id)
        setOpen(true)
    }

    return (
        <div>
            <Card variant='outlined'>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions style={{backgroundColor: '#dddee0', display: 'grid', gridTemplateColumns: '3fr 2fr', padding: '4px 8px'}}>
                    <div>
                        <Typography level="h6" sx={{ fontWeight: 'md', ml: 1, color: 'text.secondary' }}>
                            {formatDistanceToNow(new Date(date), { addSuffix: true })}
                        </Typography>
                    </div>
                    <div style={{textAlign: 'right'}}>
                        <IconButton aria-label="edit" onClick={handleEdit}>
                            <EditRoundedIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={handleDelete}>
                            <DeleteRoundedIcon />
                        </IconButton>
                    </div>
                </CardActions>
            </Card>
        </div>
    )
}

export default NoteItem