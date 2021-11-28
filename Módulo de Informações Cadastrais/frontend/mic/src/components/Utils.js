import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

export function getDescricaoEndereco(endereco){
    var descricaoEndereco = endereco.logradouro + ' ' + endereco.numero;
    if(endereco.complemento ){
      descricaoEndereco += ' ' + endereco.complemento;
    }
    descricaoEndereco += ', ' + endereco.bairro + ', ' + endereco.cidade + ', ' + endereco.estado
    return descricaoEndereco;
  }

export const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    }
  }))(TableCell);
  
export const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);