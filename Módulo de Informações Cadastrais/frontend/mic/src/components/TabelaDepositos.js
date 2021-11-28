import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from '@material-ui/core/TableHead';
import Toolbar from "@material-ui/core/Toolbar";
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Depositos from '../services/api/depositos';
import { getDescricaoEndereco, StyledTableCell, StyledTableRow } from './Utils';

const useStyles = makeStyles({
    table: {
      textAlign: 'center'
    },
  });

export default function TabelaClientes() {
  const classes = useStyles();
  const [clientesData, setData] = useState([])
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

 useEffect(() => {
    const token = localStorage.jwtToken;
    Depositos.get('/', {
        responseType: 'json',
        headers: {'Authorization': `Bearer ${token}`}
    }).then(response => {
        setData(response.data)});
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Toolbar
        className={classes.root}>
          <h6>Depósitos</h6>
        </Toolbar>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Código</StyledTableCell>
              <StyledTableCell align="left">Telefone</StyledTableCell>
              <StyledTableCell align="left">Endereço</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientesData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="left">{row.codigo}</StyledTableCell>
                <StyledTableCell align="left">{row.telefone}</StyledTableCell>
                <StyledTableCell align="left">{getDescricaoEndereco(row.endereco)}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          labelRowsPerPage="Registros por página"
          count={clientesData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </div>
  );
}
