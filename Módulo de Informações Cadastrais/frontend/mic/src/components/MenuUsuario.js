import React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useDispatch } from "react-redux";
import { logoutUser } from '../services/user/auth/authActions';
import Button from '@mui/material/Button';

const MenuUsuario = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();
    const sairSistema = () => {
        dispatch(logoutUser());
      };

    return (
        <div>
            <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit">
            <AccountCircle />
            </IconButton>
            <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
            >
            <MenuItem onClick={handleClose}><Button  href="/minhaConta">Minha Conta</Button></MenuItem>
            <MenuItem onClick={sairSistema}><Button  href="/">Sair</Button></MenuItem>
            </Menu>
        </div>
        )
};

export default MenuUsuario;