import { Snackbar, Slide, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React, { useContext } from 'react'
import dialogContext from '../contexts/dialog/dialogContext'

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

const Alert = () => {
    const { snackMsg, setSnakMsg } = useContext(dialogContext)

    return (
        <div>
            <Snackbar
                open={snackMsg.length!==0}
                onClose={() => setSnakMsg('')}
                TransitionComponent={TransitionUp}
                autoHideDuration={2000}
                message={snackMsg}
                style={{color: 'green'}}
                action={
                    <React.Fragment>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color='inherit'
                            onClick={() => setSnakMsg('')}
                        >
                            <CloseRoundedIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    )
}

export default Alert
