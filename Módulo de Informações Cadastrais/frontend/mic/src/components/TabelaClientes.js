import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from "@mui/material/TablePagination";
import TableHead from '@mui/material/TableHead';
import Toolbar from "@mui/material/Toolbar";
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Clientes from '../services/api/clientes';
import { getDescricaoEndereco, StyledTableCell, StyledTableRow } from './Utils';


export default function TabelaClientes() {
  const [clientesData, setData] = useState([])
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

 useEffect(() => {
    const token = localStorage.jwtToken;

    Clientes.get('/', {
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
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Clientes</Typography>
        </Toolbar>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">CNPJ</StyledTableCell>
              <StyledTableCell align="left">Razão Social</StyledTableCell>
              <StyledTableCell align="left">Telefone</StyledTableCell>
              <StyledTableCell align="left">E-mail</StyledTableCell>
              <StyledTableCell align="left">Endereço</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientesData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="left">{row.cnpj}</StyledTableCell>
                <StyledTableCell align="left">{row.razaoSocial}</StyledTableCell>
                <StyledTableCell align="left">{row.telefone}</StyledTableCell>
                <StyledTableCell align="left">{row.email}</StyledTableCell>
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
