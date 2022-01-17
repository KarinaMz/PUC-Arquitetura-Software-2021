import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuUsuario from '../../components/MenuUsuario';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export default function BarraMenuAdm() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton 
              onClick={handleClick} sx={{ mr: 2 }}
              color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose} >
              <MenuItem onClick={handleClose} ><Button  href="/listaClientes">Clientes</Button></MenuItem>
              <MenuItem onClick={handleClose}><Button href="/listaDepositos">Depósitos</Button></MenuItem>
              <MenuItem onClick={handleClose}><Button href="/listaMercadorias">Mercadorias</Button></MenuItem>
            </Menu>
            <Typography variant="h6"  sx={{ flexGrow: 1 }}>
              Módulo de Informações Cadastrais
            </Typography>
            {(
              <MenuUsuario/>
            )}
          </Toolbar>
        </AppBar>
      </Box>
  );
}
