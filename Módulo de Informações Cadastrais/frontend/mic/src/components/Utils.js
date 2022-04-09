import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';

export function getDescricaoEndereco(endereco){
    var descricaoEndereco = endereco.logradouro + ' ' + endereco.numero;
    if(endereco.complemento ){
      descricaoEndereco += ' ' + endereco.complemento;
    }
    descricaoEndereco += ', ' + endereco.bairro + ', ' + endereco.cidade + ', ' + endereco.estado + ', ' + endereco.cep
    return descricaoEndereco;
  }

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


  export const estadosBrasileiros = [
    {value: 'Acre', label: 'Acre'},
    {value: 'Alagoas', label: 'Alagoas'},
    {value: 'Amapá', label: 'Amapá'},
    {value: 'Amazonas', label: 'Amazonas'},
    {value: 'Bahia', label: 'Bahia'},
    {value: 'Ceará', label: 'Ceará'},
    {value: 'Distrito Federal', label: 'Distrito Federal'},
    {value: 'Espírito Santo', label: 'Espírito Santo'},
    {value: 'Goiás', label: 'Goiás'},
    {value: 'Maranhão', label: 'Maranhão'},
    {value: 'Mato Grosso', label: 'Mato Grosso'},
    {value: 'Mato Grosso do Sul', label: 'Mato Grosso do Sul'},
    {value: 'Minas Gerais', label: 'Minas Gerais'},
    {value: 'Pará', label: 'Pará'},
    {value: 'Paraíba', label: 'Paraíba'},
    {value: 'Paraná', label: 'Paraná'},
    {value: 'Pernambuco', label: 'Pernambuco'},
    {value: 'Piauí', label: 'Piauí'},
    {value: 'Rio de Janeiro', label: 'Rio de Janeiro'},
    {value: 'Rio Grande do Norte', label: 'Rio Grande do Norte'},
    {value: 'Rio Grande do Sul', label: 'Rio Grande do Sul'},
    {value: 'Rondônia', label: 'Rondônia'},
    {value: 'Roraima', label: 'Roraima'},
    {value: 'Santa Catarina', label: 'Santa Catarina'},
    {value: 'São Paulo', label: 'São Paulo'},
    {value: 'Sergipe', label: 'Sergipe'},
    {value: 'Tocantins', label: 'Tocantins'}
  ];