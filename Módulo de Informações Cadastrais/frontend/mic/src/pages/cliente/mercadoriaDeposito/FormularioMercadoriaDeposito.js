import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { getDescricaoEndereco } from '../../../components/Utils';
import { saveMercadoriaDeposito } from '../../../services/api/mercadoriasDeposito';
import { getAllDepositos } from '../../../services/api/depositos';
import { getAllByCliente } from '../../../services/api/mercadorias';

const FormularioMercadoriasDeposito = (props) => {
    const [mercadoria, setMercadoria] = useState([]);
    const [deposito, setDeposito] = useState([]);
    const [quantidade, setQuantidade] = useState([]);

    const [listaDepositos, setListaDepositos] = useState([]);
    const [listaMercadorias, setListaMercadorias] = useState([]);

    useEffect(() => { 
        getAllByCliente().then(response => {setListaMercadorias(response.data)});
        getAllDepositos().then(response => {setListaDepositos(response.data)});
    }, []);

    function salvarMercadoriaDeposito(){
        const mercadoriaDeposito = {
            idMercadoria: mercadoria.id,
            quantidade: quantidade,
            deposito: {
                id: deposito.id
            }
        }
        saveMercadoriaDeposito(mercadoriaDeposito).then(() => {
            return props.history.push("/c/listaMercadoriasDeposito");
        });
    }
    

    return (
    <div>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <p className="titulo-secao">Nova mercadoria em depósito</p> 
            </Grid>
            <Grid item xs={12} sm={12}>
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
                        <MenuItem value={row} key={row.id}>{row.codigo} - {getDescricaoEndereco(row)}</MenuItem>
                    ))}
                </Select>

                <TextField id="quantidade" sx={{mb: 2, display: "block"}}
                                value={quantidade}
                                type='number' required
                                onChange={(event) => setQuantidade(event.target.value)} 
                                label="Quantidade" />
            </Grid>
            <Grid item xs={12} sm={12}>
                <Button variant="contained" color="secondary" 
                    href="/c/listaMercadoriasDeposito" sx={{mr: 2}}
                    type='submit'>
                    Voltar
                </Button>
                <Button variant="contained" color="primary"
                    sx={{mr:2}}
                    onClick={salvarMercadoriaDeposito}
                    type='submit'>
                    Salvar
                </Button>
            </Grid>
        </Grid>
    </div>);
}

export default FormularioMercadoriasDeposito;