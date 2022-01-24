import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import InputMask from "react-input-mask";
import { editDeposito, saveDeposito } from '../../../services/api/depositos';

const FormularioDeposito = (props) => {

    useEffect(() => {
        if(props.location.state && props.location.state.depositoEdicao){
            setDeposito(props.location.state.depositoEdicao);
            console.log(props.location.state.depositoEdicao);
        } 
    }, [props]);

    const [deposito, setDeposito] = useState([]);
    const dadosDepositoChange = (event) => {
        const { name, value } = event.target;
        setDeposito({ ...deposito, [name]: value });
    };

    function salvarDeposito(){
        if(deposito.id!=null){
            editDeposito(deposito).then(() => {
                return props.history.push("/listaDepositos");
            });
        } else {
            saveDeposito(deposito).then(() => {
                return props.history.push("/listaDepositos");
            });
        }
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <p className="titulo-secao">{deposito.id!=null ? 'Editar' : 'Nova'} depósito</p> 
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="codig-deposito" sx={{mr: 2}}
                                inputProps={{maxLength: 50}}
                                value={deposito.codigo==null ? '' : deposito.codigo}
                                onChange={dadosDepositoChange} name='codigo'
                                label="Código" />
                     <InputMask
                        mask="(99)99999-9999"
                        value={deposito.telefone==null ? '' : deposito.telefone}
                        disabled={false}
                        onChange={dadosDepositoChange}
                        maskChar=" ">
                        {() => <TextField id="telefone-deposito"
                                sx={{mb: 2}}
                                name='telefone'
                                label="Telefone" />}
                    </InputMask>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <p>Endereço</p>
                    <InputMask
                        mask="99999-999"
                        value={deposito.cep==null ? '' : deposito.cep}
                        disabled={false}
                        onChange={dadosDepositoChange}
                        maskChar=" ">
                        {() => <TextField id="cep" name='cep'
                                sx={{mb: 2, mr:2}}
                                label="CEP" />
                        }
                    </InputMask>
                    <TextField id="cidade" 
                            inputProps={{maxLength: 100}}
                            value={deposito.cidade==null ? '' : deposito.cidade}
                            onChange={dadosDepositoChange} name='cidade'
                            label="Cidade" />
                    <TextField id="estado"
                            inputProps={{maxLength: 100}}
                            sx={{mb: 2, mr:2}}
                            value={deposito.estado==null ? '' : deposito.estado}
                            onChange={dadosDepositoChange} name='estado'
                            label="Estado" />
                    <TextField id="bairro"
                            inputProps={{maxLength: 100}}
                            value={deposito.bairro==null ? '' : deposito.bairro}
                            onChange={dadosDepositoChange} name='bairro'
                            label="Bairro" />
                    <TextField id="logradouro"
                            inputProps={{maxLength: 300}}
                            sx={{mb: 2}}
                            className="campo-linha-unica"
                            value={deposito.logradouro==null ? '' : deposito.logradouro}
                            onChange={dadosDepositoChange} name='logradouro'
                            label="Logradouro" />
                    <TextField id="numero"
                            inputProps={{maxLength: 10}} 
                            sx={{mr:2}}
                            value={deposito.numero==null ? '' : deposito.numero}
                            onChange={dadosDepositoChange} name='numero'
                            label="Número" />
                    <TextField id="complemento"
                            inputProps={{maxLength: 100}}
                            value={deposito.complemento==null ? '' : deposito.complemento}
                            onChange={dadosDepositoChange} name='complemento'
                            label="Complemento" />
                </Grid>
                <Grid item xs={12} sm={12} sx={{textAlign: "center"}}>
                    <Button variant="contained" color="secondary" 
                        href="/listaDepositos" sx={{mr: 2}}
                        type='submit'>
                        Voltar
                    </Button>
                    <Button variant="contained" color="primary"
                        sx={{mr:2}}
                        onClick={salvarDeposito}
                        type='submit'>
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default FormularioDeposito;