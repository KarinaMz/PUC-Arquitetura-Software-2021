import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';


export default function DialogoConfirmacao({confirmationAction, mensagem, open, setOpen}) {
    const handleClose = () => {
        setOpen(false);
      };
    const handleConfirmation = () => {
        confirmationAction();
        setOpen(false);
    };
    
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {mensagem}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleConfirmation} autoFocus>Confirmar</Button>
        </DialogActions>
        </Dialog>
    );
};