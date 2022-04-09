import { Button, Grid, MenuItem, TableHead, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getDescricaoEndereco, StyledTableCell, StyledTableRow } from "../../../components/Utils";
import { getAllDepositos } from "../../../services/api/depositos";
import { moverMercadoria, verificarDistancias } from "../../../services/api/registroMercadorias";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

const AlterarLocalRegistro = (props) => {
    const [registro, setRegistro] = useState();
    const [listaDepositos, setListaDepositos] = useState([]);
    const [deposito, setDeposito] = useState();
    const [entregue, setEntregue] = useState(false);
    const [distanciasDeposito, setDistanciasDeposito] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(false);

    useEffect(() => {
        if(props.location.state && props.location.state.registroEdicao){
            setRegistro(props.location.state.registroEdicao);
            getAllDepositos().then(response => {
                setListaDepositos(response.data)
            });
        }
    }, [props]);

    function alterarLocalMercadoria() {
        const registroMercadoria = {
            id: registro.id, 
            deposito: deposito,
            entregue: entregue
        }
        moverMercadoria(registroMercadoria)
            .then(() => { 
                return props.history.push("/listaRegistrosMercadorias");
        });
    };

    function verificarDistanciasDeposito(){
        verificarDistancias(registro.id, deposito.id).then(response => {
            setExibirTabela(true);
            setDistanciasDeposito([response.data]);
        });
    }

    function entregarMercadoria(){
        setEntregue(true);
        setDeposito(registro.deposito);
        alterarLocalMercadoria();
    }


    return (
        <div>{registro &&
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <p className="titulo-secao">Atualizar Localização - Registro {registro.codigo}</p> 
                </Grid>
                <Grid item xs={12}>
                <p>Mercadoria: {registro.nomeMercadoria} <br/>
                    Tipo de mercadoria: {registro.tipo} <br/>
                    Quantidade: {registro.quantidade} <br/>
                    Localização atual: <br/> 
                    {registro.dataEntrega && 
                        getDescricaoEndereco(registro.destino)
                    }
                    {(!registro.dataEntrega && registro.deposito) &&
                        <span>
                            Depósito {registro.deposito.codigo} <br/>
                            {getDescricaoEndereco(registro.deposito.endereco)}
                        </span>
                    }<br/>
                    Destino: {registro.destino && getDescricaoEndereco(registro.destino)}
                </p>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    id="deposito-select"
                    select fullWidth 
                    label="Selecione o depósito"
                    value={deposito ? deposito : ""} defaultValue=''
                    onChange={(event) => setDeposito(event.target.value)}>
                    {listaDepositos.map((option) => (
                        <MenuItem key={option.id} value={option}>
                        {option.codigo} - {getDescricaoEndereco(option.endereco)}
                        </MenuItem>
                    ))}
                    </TextField>
                    <Button variant="contained" color="primary"
                        sx={{mt:2}} onClick={()=>verificarDistanciasDeposito()}
                        type='submit'>
                        Verificar distâncias
                    </Button>
                </Grid>
                {exibirTabela &&
                    <Grid item xs={12} sm={12}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">Distância Até o Depósito</StyledTableCell>
                                    <StyledTableCell align="left">Distância do Depósito Até o Destino</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {distanciasDeposito
                                .map((row) => (
                                <StyledTableRow key={row.localAtual.cep}>
                                        <StyledTableCell align="left">{row.distanciaAteDeposito} - {row.tempoAteDeposito}</StyledTableCell>
                                        <StyledTableCell align="left">{row.distanciaDepositoDestino} - {row.tempoDepositoDestino}</StyledTableCell>
                                </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                }
                <Grid item xs={12} sm={12} sx={{textAlign: "center"}} >
                    <Button variant="contained" color="secondary" 
                        href="/listaRegistrosMercadorias" sx={{mr: 2}}
                        type='submit'>
                        Voltar
                    </Button>
                    <Button variant="contained" color="primary"
                        sx={{mr:2}}
                        onClick={()=>alterarLocalMercadoria()}
                        type='submit'>
                        Atualizar
                    </Button>
                    <Button variant="contained" color="primary"
                        sx={{mr:2}}
                        onClick={()=>entregarMercadoria()}
                        type='submit'>
                        Marcar como Entregue
                    </Button>
                </Grid>
            </Grid>}
        </div>
    );
}

export default AlterarLocalRegistro;