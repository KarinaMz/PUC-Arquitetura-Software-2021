import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import InputMask from "react-input-mask";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { estadosBrasileiros, getDescricaoEndereco } from '../../../components/Utils';
import { saveRegistroMercadoria } from '../../../services/api/registroMercadorias';
import { getAllDepositos } from '../../../services/api/depositos';
import { getAllByCliente } from '../../../services/api/mercadorias';

const FormularioRegistroMercadoria = (props) => {
    const [mercadoria, setMercadoria] = useState([]);
    const [deposito, setDeposito] = useState([]);
    const [quantidade, setQuantidade] = useState([]);
    const [codigo, setCodigo] = useState();
    const [endereco, setEndereco] = useState();

    const [listaDepositos, setListaDepositos] = useState([]);
    const [listaMercadorias, setListaMercadorias] = useState([]);

    useEffect(() => { 
        getAllByCliente().then(response => {setListaMercadorias(response.data)});
        getAllDepositos().then(response => {setListaDepositos(response.data)});
    }, []);

    function salvarRegistroMercadoria(){
        const registroMercadoria = {
            idMercadoria: mercadoria.id,
            quantidade: quantidade,
            deposito: {
                id: deposito.id
            },
            codigo: codigo,
            destino: endereco
        }
        saveRegistroMercadoria(registroMercadoria).then(() => {
            return props.history.push("/c/listaRegistroMercadorias");
        });
    }

    const dadosEnderecoChange = (event) => {
        const { name, value } = event.target;
        setEndereco({ ...endereco, [name]: value });
    }
    

    return (
    <div>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <p className="titulo-secao">Novo registro de mercadoria</p> 
            </Grid>
            
            <Grid item xs={12} sm={6}>
                <TextField id="codig-mercadoria" sx={{mb: 2, display: "block"}}
                                    inputProps={{maxLength: 15}}
                                    value={codigo}
                                    onChange={(event) => setCodigo(event.target.value)}  
                                    name='codigo'
                                    label="Código" />

                <InputLabel id="mercadoria-label">Mercadoria</InputLabel>
                <Select sx={{mb: 2, display: "block"}}
                    labelId="mercadoria-label"
                    id="mercadoria" 
                    value={mercadoria} required
                    onChange={(event) => setMercadoria(event.target.value)}
                    label="Mercadoria" >
                    <MenuItem disabled value="">
                        <em>Mercadoria</em>
                    </MenuItem>
                    {listaMercadorias.map((row) => (
                        <MenuItem value={row} key={row.id}>{row.nome}</MenuItem>
                    ))}
                </Select>

                <InputLabel id="deposito-label">Depósito</InputLabel>
                <Select sx={{mb: 2, display: "block"}}
                    labelId="deposito-label"
                    id="deposito" 
                    value={deposito} required
                    onChange={(event) => setDeposito(event.target.value)}
                    label="Depósito" >
                    <MenuItem disabled value="">
                        <em>Depósito</em>
                    </MenuItem>
                    {listaDepositos.map((row) => (
                        <MenuItem value={row} key={row.id}>{row.codigo} - {getDescricaoEndereco(row.endereco)}</MenuItem>
                    ))}
                </Select>

                <TextField id="quantidade" sx={{mb: 2, display: "block"}}
                                value={quantidade}
                                type='number' required
                                onChange={(event) => setQuantidade(event.target.value)} 
                                label="Quantidade" />
            </Grid>
            <Grid item xs={12} sm={6}>
            <p>Endereço de Destino </p>
                    <InputMask
                        mask="99999-999"
                        value={endereco==null ? '' : endereco.cep}
                        disabled={false}
                        onChange={dadosEnderecoChange}
                        maskChar=" ">
                        {() => <TextField id="cep" name='cep'
                                sx={{mb: 2, mr:2}}
                                label="CEP" />
                        }
                    </InputMask>
                    <TextField id="cidade" 
                            inputProps={{maxLength: 100}}
                            value={endereco==null ? '' : endereco.cidade}
                            onChange={dadosEnderecoChange} name='cidade'
                            label="Cidade" />
                    <TextField
                            id="estado-select"
                            select  
                            label="Estado" name='estado'
                            sx={{mb: 2, mr:2, width: 220}}
                            value={endereco==null ? '' : endereco.estado}
                            onChange={dadosEnderecoChange}>
                            {estadosBrasileiros.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                    </TextField>
                    <TextField id="bairro"
                            inputProps={{maxLength: 100}}
                            value={endereco==null ? '' : endereco.bairro}
                            onChange={dadosEnderecoChange} name='bairro'
                            label="Bairro" />
                    <TextField id="logradouro"
                            inputProps={{maxLength: 300}}
                            sx={{mb: 2}}
                            className="campo-linha-unica"
                            value={endereco==null ? '' : endereco.logradouro}
                            onChange={dadosEnderecoChange} name='logradouro'
                            label="Logradouro" />
                    <TextField id="numero"
                            inputProps={{maxLength: 10}} 
                            sx={{mr:2}}
                            value={endereco==null ? '' : endereco.numero}
                            onChange={dadosEnderecoChange} name='numero'
                            label="Número" />
                    <TextField id="complemento"
                            inputProps={{maxLength: 100}}
                            value={endereco==null ? '' : endereco.complemento}
                            onChange={dadosEnderecoChange} name='complemento'
                            label="Complemento" />
            </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
            <Button variant="contained" color="secondary" 
                href="/c/listaRegistroMercadorias" sx={{mr: 2}}
                type='submit'>
                Voltar
            </Button>
            <Button variant="contained" color="primary"
                sx={{mr:2}}
                onClick={salvarRegistroMercadoria}
                type='submit'>
                Salvar
            </Button>
        </Grid>
    </div>);
}

export default FormularioRegistroMercadoria;