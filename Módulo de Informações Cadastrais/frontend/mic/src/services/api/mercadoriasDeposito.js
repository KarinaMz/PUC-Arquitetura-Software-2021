import axios from 'axios';
import { getHeaders, getUsername, BASE_URL } from './config';

const BASE_URL_MERCADORIAS_DEPOSITO = `${BASE_URL}/mercadoriasDepositos`;

async function getAllByUsuario() {
  return Promise.resolve(await axios.get(`${BASE_URL_MERCADORIAS_DEPOSITO}/usuario/${getUsername()}`, {
    responseType: 'json',
    headers: getHeaders()
  }));
};

async function deleteMercadoriaDeposito(idMercadoriaDeposito){
    return Promise.resolve(await axios.delete(`${BASE_URL_MERCADORIAS_DEPOSITO}/${idMercadoriaDeposito}`, {
        responseType: 'json',
        headers: getHeaders()
      }));
}

async function moverMercadoria(mercadoriaDeposito){
    return Promise.resolve(await axios.put(`${BASE_URL_MERCADORIAS_DEPOSITO}/deposito`, mercadoriaDeposito, {
      responseType: 'json',
      headers: getHeaders()
    }));
  }

async function alterarQuantidadeMercadoria(mercadoriaDeposito){
return Promise.resolve(await axios.put(`${BASE_URL_MERCADORIAS_DEPOSITO}/quantidade`, mercadoriaDeposito, {
    responseType: 'json',
    headers: getHeaders()
}));
}

async function saveMercadoriaDeposito(mercadoriaDeposito){
return Promise.resolve(await axios.post(`${BASE_URL_MERCADORIAS_DEPOSITO}`, mercadoriaDeposito, {
    responseType: 'json',
    headers: getHeaders()
}));
}

export { getAllByUsuario, deleteMercadoriaDeposito, moverMercadoria, alterarQuantidadeMercadoria, saveMercadoriaDeposito}