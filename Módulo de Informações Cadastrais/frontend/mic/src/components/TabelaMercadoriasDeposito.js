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
import { getAllByUsuario, deleteMercadoriaDeposito, alterarQuantidadeMercadoria, moverMercadoria, getHistoricoPorMercadoria } from '../services/api/mercadoriasDeposito';
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
import { Link } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { getAllDepositos } from '../services/api/depositos'; 
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const TabelaMercadoriasDeposito = (props) => {
  const [mercadoriasDepositoData, setData] = useState([]);
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
  const [mercadoriaDepositoExclusao, setMercadoriaDepositoExclusao] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = (mercadoriaDeposito) => {
    setMercadoriaDepositoExclusao(mercadoriaDeposito);
    setOpen(true);
  };
  function excluirMercadoriaDeposito(){
    deleteMercadoriaDeposito(mercadoriaDepositoExclusao.id).then(() => { 
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
const [mercadoriaDepositoEdicao, setMercadoriaDepositoEdicao] = useState();
const [deposito, setDeposito] = useState([]);
const handleOpenMoverMercadoria = (mercadoriaDeposito) => {
    setOpenMoverMercadoria(true);
    setMercadoriaDepositoEdicao(mercadoriaDeposito);
    getAllDepositos().then(response => {setListaDepositos(response.data)});
}
const handleCloseMoverMercadoria = () => {
    setOpenMoverMercadoria(false);
  };
function handleMoverMercadoria() {
    const mercadoriaDepositoMovida = {
        id: mercadoriaDepositoEdicao.id, 
        deposito: deposito
    }
    moverMercadoria(mercadoriaDepositoMovida)
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
const handleOpenAlterarQtd = (mercadoriaDeposito) => {
  setOpenAlterarQtd(true);
  setQtdMercadorias(mercadoriaDeposito.quantidade);
  setMercadoriaDepositoEdicao(mercadoriaDeposito);
}
function handleAlterarQtdMercadoria(){
  const mercadoriaDepositoAlterada = {
      id: mercadoriaDepositoEdicao.id, 
      quantidade: qtdMercadorias
  }
  alterarQuantidadeMercadoria(mercadoriaDepositoAlterada)
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
const handleOpenHistoricos = (mercadoriaDeposito) => {
  setOpenHistoricos(true);
  setMercadoriaDepositoEdicao(mercadoriaDeposito);
  getHistoricoPorMercadoria(mercadoriaDeposito.id).then(response => {setHistoricos(response.data)});
}
const handleCloseHistoricos = () => {
  setOpenHistoricos(false);
};

  return (
    <div>
      <TableContainer component={Paper}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Mercadorias em depósitos</Typography>
          {!perfilAdm &&
            <Button variant="contained" color="primary"
                href="/c/formularioMercadoriaDeposito"
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
              <StyledTableCell align="left">Mercadoria</StyledTableCell>
              <StyledTableCell align="left">Depósito</StyledTableCell>
              <StyledTableCell align="left">Quantidade</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mercadoriasDepositoData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <StyledTableRow key={row.id}>
                {perfilAdm &&
                    <StyledTableCell align="left">{row.nomeCliente}</StyledTableCell>
                }
                <StyledTableCell align="left">{row.codigo}</StyledTableCell>
                <StyledTableCell align="left">{row.nomeMercadoria}</StyledTableCell>
                <StyledTableCell align="left">
                    {row.deposito.codigo}<br></br>
                    {getDescricaoEndereco(row.deposito)}  
                </StyledTableCell>
                <StyledTableCell align="left">{row.quantidade}</StyledTableCell>
                <StyledTableCell>
                <IconButton aria-label="ver histórico" color="primary" onClick={() => handleOpenAlterarQtd(row)}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="ver histórico" color="primary" onClick={() => handleOpenHistoricos(row)}>
                    <HistoryIcon />
                </IconButton>
                <IconButton aria-label="mover" color="primary" onClick={() => handleOpenMoverMercadoria(row)}>
                    <LocalShippingIcon />
                </IconButton>
                <IconButton aria-label="delete" color="primary" onClick={() => handleClickOpen(row)}>
                  <DeleteIcon />
                </IconButton>
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
          count={mercadoriasDepositoData.length}
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
        confirmationAction={excluirMercadoriaDeposito}
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
            Mover mercadoria para o depósito:
        </DialogContentText>
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
            Alterar a quantidade de mercadoria no depósito:
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
            Histórico de localização - {mercadoriaDepositoEdicao!=null ? mercadoriaDepositoEdicao.codigo : ''}
        </DialogContentText>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
                <StyledTableCell align="left">Data</StyledTableCell>
                <StyledTableCell align="left">Depósito</StyledTableCell>
                <StyledTableCell align="left">Usuário</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historicos
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <StyledTableRow key={row.dataHora}>
                <StyledTableCell align="left">{row.dataHora}</StyledTableCell>
                <StyledTableCell align="left">{row.depositoDTO.codigo} - {getDescricaoEndereco(row.depositoDTO)}</StyledTableCell>
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

export default TabelaMercadoriasDeposito;