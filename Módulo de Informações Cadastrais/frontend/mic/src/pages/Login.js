import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Paper, TextField, Avatar, Button } from "@mui/material";
import KeyIcon from '@mui/icons-material/VpnKey';
import { authenticateUser } from "../services/user/auth/authActions";

const Login = (props) => {
    const initialState = {
        login: "",
        password: "",
      };

    const [user, setUser] = useState(initialState);
    const [error, setError] = useState();
    const [show, setShow] = useState(true);
    const credentialChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
      };
    const dispatch = useDispatch();
    const validateUser = () => {
        dispatch(authenticateUser(user.login, user.password))
          .then((response) => {
            return props.history.push("/listaClientes");
          })
          .catch((error) => {
            console.log(error.message);
            setShow(true);
            setError("Senha ou usuário inválidos!");
          });
      };

    const paperStyle={padding :20,height:'50vh',width:350, margin:"50px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return (
        <Grid>
            <Paper elevation={3} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><KeyIcon/></Avatar>
                    <h3>Módulo de Informações Cadastrais</h3>
                </Grid>
                <TextField label='Usuário' placeholder='Digite o usuário' 
                    onChange={credentialChange} name="login"
                    value={user.login} fullWidth required/>
                <TextField label='Senha' placeholder='Digite a senha' type='password' 
                    onChange={credentialChange} name="password"
                    value={user.password} fullWidth required/>
                <Button onClick={validateUser} type='submit' color='primary' variant="contained" 
                    disabled={user.login.length === 0 || user.password.length === 0} 
                    style={btnstyle} fullWidth>Entrar</Button>
                    {show && error && (
                    <p style={{color: "red"}}>
                        {error}
                    </p>
                    )}
            </Paper>
        </Grid>
    );
}

export default Login;