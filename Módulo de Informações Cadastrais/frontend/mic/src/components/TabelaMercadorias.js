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
import { getAllByCliente, deleteMercadoria } from '../services/api/mercadorias';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { StyledTableCell, StyledTableRow } from './Utils';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DialogoConfirmacao from './DialogoConfirmacao';
import Alerta from './Alerta';
import { Link } from 'react-router-dom';


const TabelaMercadorias = (props) => {
  const [mercadoriaData, setData] = useState([]);
  const [openAlertSucess, setOpenAlertSucess] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

 useEffect(() => {
    getAllByCliente().then(response => {
        setData(response.data)});
  }, []);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [mercadoriaExclusao, setMercadoriaExclusao] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = (mercadoria) => {
    setMercadoriaExclusao(mercadoria);
    setOpen(true);
  };
  function excluirMercadoria(){
    deleteMercadoria(mercadoriaExclusao.id).then(() => { 
      setOpenAlertSucess(true);
      getAllByCliente().then(response => {
        setData(response.data)});
    });
    setOpen(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Mercadorias</Typography>
          <Button variant="contained" color="primary"
              href="/c/formularioMercadoria"
              startIcon={<AddIcon />}>
              Nova
          </Button>
        </Toolbar>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Nome</StyledTableCell>
              <StyledTableCell align="left">Código</StyledTableCell>
              <StyledTableCell align="left">Descrição</StyledTableCell>
              <StyledTableCell align="left">Tipo</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mercadoriaData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="left">{row.nome}</StyledTableCell>
                <StyledTableCell align="left">{row.codigo}</StyledTableCell>
                <StyledTableCell align="left">{row.descricao}</StyledTableCell>
                <StyledTableCell align="left">{row.tipo}</StyledTableCell>
                <StyledTableCell>
                <Link to={{pathname:'/c/formularioMercadoria', state: {mercadoriaEdicao: row}}}>
                  <IconButton aria-label="editar" color="primary">
                      <EditIcon />
                  </IconButton>
                </Link>
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
          count={mercadoriaData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      <Alerta openAlert={openAlertSucess} 
                        setOpenAlert={setOpenAlertSucess}
                        tipo="success"
                        mensagem="A mercadoria foi excluida com sucesso!"/>
      <DialogoConfirmacao 
        confirmationAction={excluirMercadoria}
        open={open}
        setOpen={setOpen}
        mensagem="Confirmar a exclução da mercadoria?"
      />
    </div>
  );
}

export default TabelaMercadorias;