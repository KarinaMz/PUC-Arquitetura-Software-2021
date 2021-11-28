import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuUsuario from './MenuUsuario';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function BarraMenuAdm() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} 
              onClick={handleClick}
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
            <Typography variant="h6" className={classes.title}>
              Módulo de Informações Cadastrais
            </Typography>
            {(
              <MenuUsuario/>
            )}
          </Toolbar>
        </AppBar>
      </div>
  );
}
