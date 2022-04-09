import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MuiButton from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import { spacing } from "@mui/system";
import InputMask from "react-input-mask";
import { getUsuario, updateUsuario } from '../../services/api/usuario';
import Alerta from '../../components/Alerta';
import { estadosBrasileiros } from '../../components/Utils';
import { MenuItem } from '@mui/material';

const MinhaConta = (props) => {
    const Button = styled(MuiButton)(spacing);
      const [openAlertSucess, setOpenAlertSucess] = useState(false);
      const [dadosUsuario, setDadosUsuario] = useState([]);
      const [dadosSalvos, setDadosSalvos] = useState([]);
      const [fieldsReadOnly, setFieldsReadOnly] = useState(true);

      useEffect(() => {
        if(dadosUsuario.nome==null){
            getUsuario().then(response => {
                setDadosUsuario(response.data)
                setDadosSalvos(response.data);
            });
        }
      }, [dadosUsuario, fieldsReadOnly]);

      
      function editarInformacoes(){
        setFieldsReadOnly(false);
      }
      function cancelarInformacoes(){
        setFieldsReadOnly(true);
        setDadosUsuario(dadosSalvos);
      }
      function salvarInformacoes(){
        updateUsuario(dadosUsuario).then(response => {
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
      const dadosEnderecoChange = (event) => {
        const { name, value } = event.target;
        setDadosUsuario(prevState => ({
            ...prevState,
            endereco: { ...prevState.endereco, [name]: value }
        }));
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <p className="titulo-secao">Minha Conta</p> 
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Alerta openAlert={openAlertSucess} 
                        setOpenAlert={setOpenAlertSucess}
                        tipo="success"
                        mensagem="As informações foram salvas com sucesso!"/>
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
                </Grid>
                {dadosUsuario.cnpj!=null &&
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
                                    sx={{mr:2, mb: 2}}
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
                }
                <Grid item xs={12} sm={6}>
                </Grid>
                {dadosUsuario.cnpj!=null &&
                    <Grid item xs={12} sm={6}>
                        <p>Endereço</p>
                        <InputMask
                            mask="99999-999"
                            value={dadosUsuario.endereco==null ? '' : dadosUsuario.endereco.cep}
                            disabled={false}
                            onChange={dadosEnderecoChange}
                            maskChar=" ">
                            {() => <TextField id="cep" name='cep'
                                    sx={{mb: 2, mr:2}}
                                    InputProps={{readOnly: fieldsReadOnly, disabled: fieldsReadOnly}}
                                    label="CEP" />
                            }
                        </InputMask>
                        <TextField id="cidade" 
                                InputProps={{readOnly: fieldsReadOnly, disabled: fieldsReadOnly}}
                                sx={{mb: 2}}
                                inputProps={{maxlength: 100}}
                                value={dadosUsuario.endereco==null ? '' : dadosUsuario.endereco.cidade}
                                onChange={dadosEnderecoChange} name='cidade'
                                label="Cidade" />

                        <TextField
                            id="estado-select"
                            select  
                            label="Estado" name='estado'
                            InputProps={{readOnly: fieldsReadOnly, disabled: fieldsReadOnly}}
                            sx={{mb: 2, mr:2, width: 220}}
                            value={dadosUsuario.endereco==null ? '' : dadosUsuario.endereco.estado}
                            onChange={dadosEnderecoChange}>
                            {estadosBrasileiros.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField id="bairro"
                                InputProps={{readOnly: fieldsReadOnly, disabled: fieldsReadOnly}}
                                sx={{mb: 2}}
                                inputProps={{maxlength: 100}}
                                value={dadosUsuario.endereco==null ? '' : dadosUsuario.endereco.bairro}
                                onChange={dadosEnderecoChange} name='bairro'
                                label="Bairro" />
                        <TextField id="logradouro"
                                InputProps={{readOnly: fieldsReadOnly, disabled: fieldsReadOnly}}
                                sx={{mb: 2}}
                                inputProps={{maxlength: 300}}
                                className="campo-linha-unica"
                                value={dadosUsuario.endereco==null ? '' : dadosUsuario.endereco.logradouro}
                                onChange={dadosEnderecoChange} name='logradouro'
                                label="Logradouro" />
                        <TextField id="numero"
                                InputProps={{readOnly: fieldsReadOnly, disabled: fieldsReadOnly}}
                                inputProps={{maxlength: 10}}
                                sx={{mb:2, mr:2}}
                                value={dadosUsuario.endereco==null ? '' : dadosUsuario.endereco.numero}
                                onChange={dadosEnderecoChange} name='numero'
                                label="Número" />
                        <TextField id="complemento"
                                InputProps={{readOnly: fieldsReadOnly, disabled: fieldsReadOnly}}
                                inputProps={{maxlength: 100}}
                                value={dadosUsuario.endereco==null ? '' : dadosUsuario.endereco.complemento}
                                onChange={dadosEnderecoChange} name='complemento'
                                label="Complemento" />
                    </Grid>
                }
                <Grid item xs={12} sm={12} sx={{textAlign: "center"}} spacing={3}>
                    <div style={{display: 'block', marginBottom: 20}}>
                        {fieldsReadOnly &&
                            <Button variant="contained" color="primary"
                                onClick={editarInformacoes}
                                type='submit'>
                                Editar
                            </Button>
                        }
                        {!fieldsReadOnly &&
                            <div>
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
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default MinhaConta;