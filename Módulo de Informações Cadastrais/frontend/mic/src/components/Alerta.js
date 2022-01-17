import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from 'react';

export default function Alerta({openAlert, setOpenAlert, mensagem, tipo}){
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenAlert(false);
      };

    return (
        <Snackbar open={openAlert} autoHideDuration={4000} 
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}
            onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity={tipo} sx={{ width: '100%' }}>
                {mensagem}
            </Alert>
        </Snackbar>
    );
}