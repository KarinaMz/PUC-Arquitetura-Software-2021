import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from "@mui/material/TablePagination";
import TableHead from '@mui/material/TableHead';
import Toolbar from "@mui/material/Toolbar";
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { getAllDepositos, deleteDeposito } from '../services/api/depositos';
import { getDescricaoEndereco, StyledTableCell, StyledTableRow } from './Utils';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DialogoConfirmacao from './DialogoConfirmacao';
import Alerta from './Alerta';
import { Link } from 'react-router-dom';

export default function TabelaClientes() {
  const [depositosData, setData] = useState([])
  const [openAlertSucess, setOpenAlertSucess] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

 useEffect(() => {
   getAllDepositos().then(response => {
        setData(response.data)});
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [depositoExclusao, setDepositoExclusao] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = (deposito) => {
    setDepositoExclusao(deposito);
    setOpen(true);
  };

  function excluirDeposito(){
    deleteDeposito(depositoExclusao.id).then(() => { 
      setOpenAlertSucess(true);
      getAllDepositos().then(response => {
        setData(response.data)});
    });
    setOpen(false);
  };

  const perfilAdm = localStorage.perfil === 'Administrador';

  return (
    <div>
      <TableContainer component={Paper}>
        <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Depósitos</Typography>
          {perfilAdm &&
            <Button variant="contained" color="primary"
                href="/formularioDeposito"
                startIcon={<AddIcon />}>
                Novo
            </Button>
          }
        </Toolbar>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Código</StyledTableCell>
              <StyledTableCell align="left">Telefone</StyledTableCell>
              <StyledTableCell align="left">Endereço</StyledTableCell>
              {perfilAdm &&
                <StyledTableCell></StyledTableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {depositosData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="left">{row.codigo}</StyledTableCell>
                <StyledTableCell align="left">{row.telefone}</StyledTableCell>
                <StyledTableCell align="left">{getDescricaoEndereco(row.endereco)}</StyledTableCell>
                {perfilAdm &&
                  <StyledTableCell>
                    <Link to={{pathname:'/formularioDeposito', state: {depositoEdicao: row}}}>
                      <IconButton aria-label="editar" color="primary">
                          <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton aria-label="delete" color="primary" onClick={() => handleClickOpen(row)}>
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                }
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          labelRowsPerPage="Registros por página"
          count={depositosData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      <Alerta openAlert={openAlertSucess} 
                        setOpenAlert={setOpenAlertSucess}
                        tipo="success"
                        mensagem="O depósito foi excluido com sucesso!"/>
      <DialogoConfirmacao 
        confirmationAction={excluirDeposito}
        open={open}
        setOpen={setOpen}
        mensagem="Confirmar a exclução do depósito?"
      />
    </div>
  );
}
