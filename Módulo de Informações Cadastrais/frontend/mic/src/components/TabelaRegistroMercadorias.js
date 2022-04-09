import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from "@mui/material/TablePagination";
import Typography from '@mui/material/Typography';
import TableHead from '@mui/material/TableHead';
import Toolbar from "@mui/material/Toolbar";
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { getAllByUsuario, deleteRegistroMercadoria, alterarQuantidadeMercadoria, moverMercadoria, getHistoricoPorMercadoria } from '../services/api/registroMercadorias';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import { getDescricaoEndereco, StyledTableCell, StyledTableRow } from './Utils';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DialogoConfirmacao from './DialogoConfirmacao';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Alerta from './Alerta';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { getAllDepositos } from '../services/api/depositos'; 
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

const TabelaRegistrosMercadorias = (props) => {
  const [registroMercadoriasData, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const perfilAdm = localStorage.perfil === 'Administrador';

 useEffect(() => {
    getAllByUsuario().then(response => {setData(response.data)});
  }, []);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /* Excluir */  
  const [openAlertSucess, setOpenAlertSucess] = useState(false);
  const [registroMercadoriaExclusao, setRegistroMercadoriaExclusao] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = (registroMercadoria) => {
    setRegistroMercadoriaExclusao(registroMercadoria);
    setOpen(true);
  };
  function excluirRegistroMercadoria(){
    deleteRegistroMercadoria(registroMercadoriaExclusao.id).then(() => { 
      setOpenAlertSucess(true);
      getAllByUsuario().then(response => {
        setData(response.data)});
    });
    setOpen(false);
  };

/* Mover */
const [openMoverMercadoria, setOpenMoverMercadoria] = useState(false);
const [openAlertMercadoriaMovida, setOpenAlertMercadoriaMovida] = useState(false);
const [listaDepositos, setListaDepositos] = useState([]);
const [registroMercadoriaEdicao, setRegistroMercadoriaEdicao] = useState();
const [deposito, setDeposito] = useState([]);
const handleOpenMoverMercadoria = (registroMercadoria) => {
    setOpenMoverMercadoria(true);
    setRegistroMercadoriaEdicao(registroMercadoria);
    getAllDepositos().then(response => {setListaDepositos(response.data)});
}
const handleCloseMoverMercadoria = () => {
    setOpenMoverMercadoria(false);
  };
function handleMoverMercadoria() {
    const registroMercadoriaMovida = {
        id: registroMercadoriaEdicao.id, 
        deposito: deposito
    }
    moverMercadoria(registroMercadoriaMovida)
        .then(() => { 
            setOpenAlertMercadoriaMovida(true);
            setOpenMoverMercadoria(false);
            getAllByUsuario().then(response => {
              setData(response.data)});
        });
};

/* Alterar */
const [openAlterarQtd, setOpenAlterarQtd] = useState(false);
const [qtdMercadorias, setQtdMercadorias] = useState(0);
const [openAlertAlterarQtd, setOpenAlertAlterarQtd] = useState(false);
const handleOpenAlterarQtd = (registroMercadoria) => {
  setOpenAlterarQtd(true);
  setQtdMercadorias(registroMercadoria.quantidade);
  setRegistroMercadoriaEdicao(registroMercadoria);
}
function handleAlterarQtdMercadoria(){
  const registroMercadoriaAlterada = {
      id: registroMercadoriaEdicao.id, 
      quantidade: qtdMercadorias
  }
  alterarQuantidadeMercadoria(registroMercadoriaAlterada)
        .then(() => { 
            setOpenAlertAlterarQtd(true);
            setOpenAlterarQtd(false);
            getAllByUsuario().then(response => {
              setData(response.data)});
        });
}
const handleCloseAlterarQtd = () => {
  setOpenAlterarQtd(false);
};

/* Histórico */
const [historicos, setHistoricos] = useState([]);
const [openHistoricos, setOpenHistoricos] = useState(false);
const handleOpenHistoricos = (registroMercadoria) => {
  setOpenHistoricos(true);
  setRegistroMercadoriaEdicao(registroMercadoria);
  getHistoricoPorMercadoria(registroMercadoria.codigo).then(response => {setHistoricos(response.data)});
}
const handleCloseHistoricos = () => {
  setOpenHistoricos(false);
};

  return (
    <div>
      <TableContainer component={Paper}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Registros de mercadorias</Typography>
          {!perfilAdm &&
            <Button variant="contained" color="primary"
                href="/c/formularioRegistroMercadoria"
                startIcon={<AddIcon />}>
                Nova
            </Button>
          }
        </Toolbar>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {perfilAdm &&
                <StyledTableCell align="left">Cliente</StyledTableCell>
              }
              <StyledTableCell align="left">Código</StyledTableCell>
              <StyledTableCell align="left">Local</StyledTableCell>
              <StyledTableCell align="left">Destino</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registroMercadoriasData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <StyledTableRow key={row.id}>
                {perfilAdm &&
                    <StyledTableCell align="left">{row.nomeCliente}</StyledTableCell>
                }
                <StyledTableCell align="left">{row.codigo}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.dataEntrega && 
                    getDescricaoEndereco(row.destino)
                  }
                  {!row.dataEntrega &&
                    <span>
                      Depósito: {row.deposito.codigo} <br/>
                      {getDescricaoEndereco(row.deposito.endereco)}
                    </span>
                  }
                </StyledTableCell>
                <StyledTableCell align="left">{getDescricaoEndereco(row.destino)}</StyledTableCell>
                <StyledTableCell align="left">{row.status}</StyledTableCell>
                <StyledTableCell>
                {(perfilAdm || row.status === 'Registrado') &&
                  <IconButton aria-label="alterar quantidade" color="primary" onClick={() => handleOpenAlterarQtd(row)}>
                      <EditIcon />
                  </IconButton>
                }
                <IconButton aria-label="ver histórico" color="primary" onClick={() => handleOpenHistoricos(row)}>
                    <HistoryIcon />
                </IconButton>
                {(perfilAdm && row.status !== 'Entregue') &&
                 <Link to={{pathname:'/listaRegistrosMercadorias/local', state: {registroEdicao: row}}}>
                   <IconButton aria-label="mover" color="primary" >
                    <LocalShippingIcon />
                  </IconButton>
                 </Link>
                }
                {(!perfilAdm && row.status === 'Registrado') &&
                <IconButton aria-label="mover" color="primary" onClick={() => handleOpenMoverMercadoria(row)}>
                    <LocalShippingIcon />
                </IconButton>
                }
                {(perfilAdm || row.status === 'Registrado') &&
                <IconButton aria-label="delete" color="primary" onClick={() => handleClickOpen(row)}>
                  <DeleteIcon />
                </IconButton>
                }
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          labelRowsPerPage="Registros por página"
          count={registroMercadoriasData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      <Alerta openAlert={openAlertSucess} 
                        setOpenAlert={setOpenAlertSucess}
                        tipo="success"
                        mensagem="O registro de mercadoria no depósito foi excluida com sucesso!"/>
      <DialogoConfirmacao 
        confirmationAction={excluirRegistroMercadoria}
        open={open}
        setOpen={setOpen}
        mensagem="Confirmar a exclução do registro da mercadoria no depósito?"
      />


    <Alerta openAlert={openAlertMercadoriaMovida} 
                        setOpenAlert={setOpenAlertMercadoriaMovida}
                        tipo="success"
                        mensagem="A mercadoria foi movida de depósito com sucesso!"/>
    <Dialog
        open={openMoverMercadoria}
        onClose={handleCloseMoverMercadoria}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
            Registro - {registroMercadoriaEdicao && registroMercadoriaEdicao.codigo}<br/>
            Alterar depósito 
        </DialogContentText>
        <br/>
        <TextField
          id="deposito-select"
          select fullWidth 
          label="Selecione"
          value={deposito}
          onChange={(event) => setDeposito(event.target.value)}>
          {listaDepositos.map((option) => (
              <MenuItem key={option.value} value={option}>
              {option.codigo} - {getDescricaoEndereco(option.endereco)}
              </MenuItem>
          ))}
          </TextField>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleCloseMoverMercadoria}>Cancelar</Button>
        <Button onClick={handleMoverMercadoria} autoFocus>Confirmar</Button>
    </DialogActions>
    </Dialog>



    <Alerta openAlert={openAlertAlterarQtd} 
                        setOpenAlert={setOpenAlertAlterarQtd}
                        tipo="success"
                        mensagem="A quantidade de mercadorias foi alterada com sucesso!"/>
    <Dialog
        open={openAlterarQtd}
        onClose={handleCloseAlterarQtd}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
            Registro - {registroMercadoriaEdicao && registroMercadoriaEdicao.codigo}<br/>
            Alterar a quantidade de mercadoria:
        </DialogContentText>
        <TextField id="quantidade" sx={{mt: 4, display: "block"}}
                                value={qtdMercadorias}
                                type='number' required
                                onChange={(event) => setQtdMercadorias(event.target.value)} 
                                label="Quantidade" />
    </DialogContent>
    <DialogActions>
        <Button onClick={handleCloseAlterarQtd}>Cancelar</Button>
        <Button onClick={handleAlterarQtdMercadoria} autoFocus>Confirmar</Button>
    </DialogActions>
    </Dialog>



    <Dialog
        open={openHistoricos}
        onClose={handleCloseHistoricos}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
    <DialogContent>
        <DialogContentText id="alert-dialog-description">
            Registro - {registroMercadoriaEdicao && registroMercadoriaEdicao.codigo}<br/>
            Histórico de localização
        </DialogContentText>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
                <StyledTableCell align="left">Data</StyledTableCell>
                <StyledTableCell align="left">Local</StyledTableCell>
                <StyledTableCell align="left">Usuário</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historicos
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <StyledTableRow key={row.dataHora}>
                <StyledTableCell align="left">{row.dataHora}</StyledTableCell>
                <StyledTableCell align="left">{row.codigoDeposito && 
                  <div> 
                    Depósito: {row.codigoDeposito} 
                  </div>} 
                {getDescricaoEndereco(row.endereco)}</StyledTableCell>
                <StyledTableCell align="left">{row.nomeResponsavel}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleCloseHistoricos}>Fechar</Button>
    </DialogActions>
    </Dialog>
    </div>
  );
}

export default TabelaRegistrosMercadorias;