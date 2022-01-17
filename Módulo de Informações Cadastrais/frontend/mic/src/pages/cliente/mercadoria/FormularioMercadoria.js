import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { editMercadoria, saveMercadoria } from '../../../services/api/mercadorias';

const FormularioMercadoria = (props) => {
    const [mercadoria, setMercadoria] = useState([]);
    const dadosMercadoriaChange = (event) => {
        const { name, value } = event.target;
        setMercadoria({ ...mercadoria, [name]: value });
    };

    useEffect(() => {
        if(props.location.state && props.location.state.mercadoriaEdicao){
            var tipo;
            switch(props.location.state.mercadoriaEdicao.tipo){
                case 'Líquido':
                    tipo = 'LIQUIDO';
                    break;
                case 'Geral':
                    tipo = 'GERAL';
                    break;
                case 'Frigorífico':
                    tipo = 'FRIGORIFICO';
                    break;
                default:
                    break;
            }
            props.location.state.mercadoriaEdicao.tipo = tipo;
            setMercadoria(props.location.state.mercadoriaEdicao);
        } else {
            setMercadoria({ ...mercadoria, idCliente:  5});
        }
    }, [props, mercadoria]);

    function salvarMercadoria(){
        if(mercadoria.id!=null){
            editMercadoria(mercadoria).then(() => {
                return props.history.push("/c/listaMercadorias");
            });
        } else {
            saveMercadoria(mercadoria).then(() => {
                return props.history.push("/c/listaMercadorias");
            });
        }
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <p className="titulo-secao">{mercadoria.id!=null ? 'Editar' : 'Nova'} Mercadoria</p> 
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="codig-mercadoria" sx={{mb: 2, display: "block"}}
                                inputProps={{maxLength: 50}}
                                value={mercadoria.codigo==null ? '' : mercadoria.codigo}
                                onChange={dadosMercadoriaChange} name='codigo'
                                label="Código" />

                    <TextField id="nome-mercadoria" sx={{mb: 2, width: "90%"}}
                                inputProps={{maxLength: 200}} required
                                value={mercadoria.nome==null ? '' : mercadoria.nome}
                                onChange={dadosMercadoriaChange} name='nome'
                                label="Nome" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel id="tipo-mercadoria-label">Tipo de Mercadoria</InputLabel>
                    <Select sx={{mb: 2, display: "block", width: "150px"}}
                        labelId="tipo-mercadoria-label"
                        id="tipo-mercadoria" name='tipo'
                        value={mercadoria.tipo==null ? '' : mercadoria.tipo}
                        label="Tipo de Mercadoria" required 
                        onChange={dadosMercadoriaChange}>
                        <MenuItem disabled value="">
                            <em>Tipo de Mercadoria</em>
                        </MenuItem>
                        <MenuItem value={"FRIGORIFICO"}>Frigorífico</MenuItem>
                        <MenuItem value={"GERAL"}>Geral</MenuItem>
                        <MenuItem value={"LIQUIDO"}>Líquido</MenuItem>
                    </Select>

                    <TextField id="descricao-mercadoria" sx={{mb: 2, width: "90%"}}
                                inputProps={{maxLength: 1000}}
                                multiline rows={4}
                                value={mercadoria.descricao==null ? '' : mercadoria.descricao}
                                onChange={dadosMercadoriaChange} name='descricao'
                                label="Descrição" />
                </Grid>
                <Grid item xs={12} sm={12} sx={{textAlign: "center"}}>
                    <Button variant="contained" color="secondary" 
                        href="/c/listaMercadorias" sx={{mr: 2}}
                        type='submit'>
                        Voltar
                    </Button>
                    <Button variant="contained" color="primary"
                        sx={{mr:2}}
                        onClick={salvarMercadoria}
                        type='submit'>
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default FormularioMercadoria;