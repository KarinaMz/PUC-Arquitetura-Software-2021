import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MuiButton from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import { spacing } from "@mui/system";
import InputMask from "react-input-mask";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import UsuarioAPI from '../services/api/usuario';
import axios from 'axios';

const MinhaConta = (props) => {
    const Button = styled(MuiButton)(spacing);
    /*const useStyles = makeStyles((theme) => ({
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
            marginBottom: '40px',
          },
          '& .campo-linha-unica': {
              display: 'block',
              width: '50ch',
          },
          '& .campo-linha-unica .MuiInputBase-root': {
            width: '100%',
        },
        },
      }));
      const classes = useStyles();*/
      const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
      const [dadosUsuario, setDadosUsuario] = useState([])
      const [dadosSalvos, setDadosSalvos] = useState([])
      const [fieldsReadOnly, setFieldsReadOnly] = useState(true);
      const [openAlertSucess, setOpenAlertSucess] = useState(false);
      function carregarInformacoes (){
        if(dadosUsuario.nome==null){
            const token = localStorage.jwtToken;
            const username = localStorage.username;
        
            UsuarioAPI.get('/'+username, {
                responseType: 'json',
                headers: {'Authorization': `Bearer ${token}`}
            }).then(response => {
                setDadosUsuario(response.data)
                setDadosSalvos(response.data);
            });
        }
    }

      useEffect(() => {
        carregarInformacoes();
      }, [fieldsReadOnly]);

      
      function editarInformacoes(){
        setFieldsReadOnly(false);
      }
      function cancelarInformacoes(){
        setFieldsReadOnly(true);
        setDadosUsuario(dadosSalvos);
      }
      function salvarInformacoes(){
        const token = localStorage.jwtToken;
        const username = localStorage.username;
        const headers = { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        axios.put('http://localhost:8080/usuario/'+username, dadosUsuario, { headers }
            ).then(response => {
                setDadosUsuario(response.data);
                setDadosSalvos(response.data);
                setFieldsReadOnly(true);
                setOpenAlertSucess(true);
            });
      }
      const dadosChange = (event) => {
        const { name, value } = event.target;
        setDadosUsuario({ ...dadosUsuario, [name]: value });
      };
    
      const handleCloseAlertSucess = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenAlertSucess(false);
      };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <p className="titulo-secao">Minha Conta</p> 
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Snackbar open={openAlertSucess} autoHideDuration={4000} 
                        anchorOrigin={{
                            vertical: "center",
                            horizontal: "center"
                         }}
                        onClose={handleCloseAlertSucess}>
                        <Alert onClose={handleCloseAlertSucess} severity="success" sx={{ width: '100%' }}>
                         As informações foram salvas com sucesso!
                        </Alert>
                    </Snackbar>
                    <p>Informações básicas</p>   
                    <TextField id="nome-usuario" sx={{mb: 2, mr:2}}
                            InputProps={{readOnly: fieldsReadOnly, disabled: fieldsReadOnly}}
                            inputProps={{maxLength: 200}}
                            value={dadosUsuario.nome==null ? '' : dadosUsuario.nome}
                            onChange={dadosChange} name='nome'
                            label="Nome" />
                    <TextField id="perfil-usuario"
                        InputProps={{readOnly: true,  disabled: true}}
                        value={dadosUsuario.perfil==null ? '' : dadosUsuario.perfil}
                        label="Perfil" /> 
                    {fieldsReadOnly &&
                        <Button variant="contained" color="primary" style={{display: 'block'}}
                            onClick={editarInformacoes}
                            type='submit'>
                            Editar
                        </Button>
                    }
                    {!fieldsReadOnly &&
                        <div style={{display: 'block'}}>
                            <Button variant="contained" color="secondary" 
                                onClick={cancelarInformacoes} mr={2}
                                type='submit'>
                                Cancelar
                            </Button>
                            <Button variant="contained" color="primary"
                                sx={{mr:2}}
                                onClick={salvarInformacoes}
                                type='submit'>
                                Salvar
                            </Button>
                        </div>
                    }
                </Grid>
                <Grid item xs={12} sm={6}>
                    <p>Informações do cliente</p>
                    <InputMask
                        mask="99.999.999/9999-99"
                        value={dadosUsuario.cnpj==null ? '' : dadosUsuario.cnpj}
                        disabled={false}
                        onChange={dadosChange}
                        maskChar=" ">
                        {() => <TextField id="cnpj"
                                sx={{mb: 2}}
                                InputProps={{readOnly: true, disabled: true}}
                                name='cnpj'
                                label="CNPJ" />}
                    </InputMask>
                    <TextField id="razao-social"
                            InputProps={{readOnly: fieldsReadOnly, disabled: fieldsReadOnly}}
                            value={dadosUsuario.razaoSocial==null ? '' : dadosUsuario.razaoSocial}
                            className="campo-linha-unica"
                            inputProps={{maxLength: 200}}
                            sx={{mb: 2}}
                            onChange={dadosChange} name='razaoSocial'
                            label="Razão Social" />
                    <InputMask
                        mask="(99)99999-9999"
                        value={dadosUsuario.telefone==null ? '' : dadosUsuario.telefone}
                        disabled={false}
                        onChange={dadosChange}
                        maskChar=" ">
                        {() => <TextField id="telefone"
                                InputProps={{readOnly: fieldsReadOnly, disabled: fieldsReadOnly}}
                                sx={{mr:2}}
                                name='telefone'
                                label="Telefone" />}
                    </InputMask>
                    <TextField id="email" 
                            InputProps={{readOnly: fieldsReadOnly, disabled: fieldsReadOnly}}
                            inputProps={{maxLength: 100}}
                            value={dadosUsuario.email==null ? '' : dadosUsuario.email}
                            onChange={dadosChange} name='email'
                            label="E-mail" />
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <p>Endereço</p>
                    <InputMask
                        mask="99999-999"
                        value={dadosUsuario.cep==null ? '' : dadosUsuario.cep}
                        disabled={false}
                        onChange={dadosChange}
                        maskChar=" ">
                        {() => <TextField id="cep" name='cep'
                                sx={{mb: 2, mr:2}}
                                InputProps={{readOnly: fieldsReadOnly, disabled: fieldsReadOnly}}
                                label="CEP" />
                        }
                    </InputMask>
                    <TextField id="cidade" 
                            InputProps={{readOnly: fieldsReadOnly, disabled: fieldsReadOnly}}
                            inputProps={{maxLength: 100}}
                            value={dadosUsuario.cidade==null ? '' : dadosUsuario.cidade}
                            onChange={dadosChange} name='cidade'
                            label="Cidade" />
                    <TextField id="estado"
                            InputProps={{readOnly: fieldsReadOnly, disabled: fieldsReadOnly}}
                            inputProps={{maxLength: 100}}
                            sx={{mb: 2, mr:2}}
                            value={dadosUsuario.estado==null ? '' : dadosUsuario.estado}
                            onChange={dadosChange} name='estado'
                            label="Estado" />
                    <TextField id="bairro"
                            InputProps={{readOnly: fieldsReadOnly, disabled: fieldsReadOnly}}
                            inputProps={{maxLength: 100}}
                            value={dadosUsuario.bairro==null ? '' : dadosUsuario.bairro}
                            onChange={dadosChange} name='bairro'
                            label="Bairro" />
                    <TextField id="logradouro"
                            InputProps={{readOnly: fieldsReadOnly, disabled: fieldsReadOnly}}
                            inputProps={{maxLength: 300}}
                            sx={{mb: 2}}
                            className="campo-linha-unica"
                            value={dadosUsuario.logradouro==null ? '' : dadosUsuario.logradouro}
                            onChange={dadosChange} name='logradouro'
                            label="Logradouro" />
                    <TextField id="numero"
                            InputProps={{readOnly: fieldsReadOnly, disabled: fieldsReadOnly}}
                            inputProps={{maxLength: 10}} 
                            sx={{mr:2}}
                            value={dadosUsuario.numero==null ? '' : dadosUsuario.numero}
                            onChange={dadosChange} name='numero'
                            label="Número" />
                    <TextField id="complemento"
                            InputProps={{readOnly: fieldsReadOnly, disabled: fieldsReadOnly}}
                            inputProps={{maxLength: 100}}
                            value={dadosUsuario.complemento==null ? '' : dadosUsuario.complemento}
                            onChange={dadosChange} name='complemento'
                            label="Complemento" />
                </Grid>
            </Grid>
        </div>
    );
}

export default MinhaConta;