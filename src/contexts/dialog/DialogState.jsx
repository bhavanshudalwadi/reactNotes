import { useState } from "react";
import DialogContext from "./dialogContext";

const NoteState = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('')
    const [dialogId, setDialogId] = useState('')

    const [snackMsg, setSnakMsg] = useState('')

    return (
        <DialogContext.Provider value={{ open, setOpen, dialogTitle, setDialogTitle, dialogId, setDialogId, snackMsg, setSnakMsg }}>
            { children }
        </DialogContext.Provider>
    );
};

export default NoteState;
