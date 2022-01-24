import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from "@mui/material/TablePagination";
import Typography from '@mui/material/Typography';
import TableHead from '@mui/material/TableHead';
import Toolbar from "@mui/material/Toolbar";
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAllByUsuario, deleteMercadoriaDeposito, alterarQuantidadeMercadoria, moverMercadoria } from '../services/api/mercadoriasDeposito';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
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
  const [openAlertSucess, setOpenAlertSucess] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

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

  const perfilAdm = localStorage.perfil === 'Administrador';


const [openModal, setOpenModal] = useState(false);
const [openAlertMercadoriaMovida, setOpenAlertMercadoriaMovida] = useState(false);
const [listaDepositos, setListaDepositos] = useState([]);
const [mercadoriaDepositoEdicao, setMercadoriaDepositoEdicao] = useState();
const [deposito, setDeposito] = useState([]);
const handleOpenModal = (mercadoriaDeposito) => {
    setOpenModal(true);
    setMercadoriaDepositoEdicao(mercadoriaDeposito);
    getAllDepositos().then(response => {setListaDepositos(response.data)});
}
const handleCloseModal = () => {
    setOpenModal(false);
  };
function handleMoverMercadoria() {
    const mercadoriaDepositoMovida = {
        id: mercadoriaDepositoEdicao.id, 
        deposito: deposito
    }
    moverMercadoria(mercadoriaDepositoMovida)
        .then(() => { 
            setOpenAlertMercadoriaMovida(true);
            setOpenModal(false);
            getAllByUsuario().then(response => {
              setData(response.data)});
        });
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
                <StyledTableCell align="left">{row.nomeMercadoria}</StyledTableCell>
                <StyledTableCell align="left">
                    {row.deposito.codigo}<br></br>
                    {getDescricaoEndereco(row.deposito)}  
                </StyledTableCell>
                <StyledTableCell align="left">{row.quantidade}</StyledTableCell>
                <StyledTableCell>
                <Link to={{pathname:'/c/qtdMercadoriaDeposito', state: {mercadoriaDepositoEdicao: row}}}>
                  <IconButton aria-label="editar" color="primary">
                      <EditIcon />
                  </IconButton>
                </Link>
                <IconButton aria-label="mover" color="primary" onClick={() => handleOpenModal(row)}>
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
        open={openModal}
        onClose={handleCloseModal}
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
        <Button onClick={handleCloseModal}>Cancelar</Button>
        <Button onClick={handleMoverMercadoria} autoFocus>Confirmar</Button>
    </DialogActions>
    </Dialog>
    </div>
  );
}

export default TabelaMercadoriasDeposito;