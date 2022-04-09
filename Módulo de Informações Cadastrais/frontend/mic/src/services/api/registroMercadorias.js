import axios from 'axios';
import { getHeaders, getUsername, BASE_URL } from './config';

const BASE_URL_REGISTRO_MERCADORIAS = `${BASE_URL}/registromercadoria`;

async function getAllByUsuario() {
  return Promise.resolve(await axios.get(`${BASE_URL_REGISTRO_MERCADORIAS}/usuario/${getUsername()}`, {
    responseType: 'json',
    headers: getHeaders()
  }));
};

async function deleteRegistroMercadoria(idRegistroMercadoria){
    return Promise.resolve(await axios.delete(`${BASE_URL_REGISTRO_MERCADORIAS}/${idRegistroMercadoria}`, {
        responseType: 'json',
        headers: getHeaders()
      }));
}

async function moverMercadoria(registroMercadoria){
    registroMercadoria.loginResponsavel = getUsername();
    return Promise.resolve(await axios.put(`${BASE_URL_REGISTRO_MERCADORIAS}/deposito`, registroMercadoria, {
      responseType: 'json',
      headers: getHeaders()
    }));
  }

async function verificarDistancias(idRegistro, idDeposito){
  return Promise.resolve(await axios.get(`${BASE_URL_REGISTRO_MERCADORIAS}/${idRegistro}/${idDeposito}`, {
    responseType: 'json',
    headers: getHeaders()
  }));
}

async function alterarQuantidadeMercadoria(registroMercadoria){
registroMercadoria.loginResponsavel = getUsername();
return Promise.resolve(await axios.put(`${BASE_URL_REGISTRO_MERCADORIAS}/quantidade`, registroMercadoria, {
    responseType: 'json',
    headers: getHeaders()
}));
}

async function saveRegistroMercadoria(registroMercadoria){
  registroMercadoria.loginResponsavel = getUsername();
  return Promise.resolve(await axios.post(`${BASE_URL_REGISTRO_MERCADORIAS}`, registroMercadoria, {
    responseType: 'json',
    headers: getHeaders()
  }));
}

async function getHistoricoPorMercadoria(codigoRegistro){
  return Promise.resolve(await axios.get(`${BASE_URL_REGISTRO_MERCADORIAS}/historico/${codigoRegistro}`, {
    responseType: 'json',
    headers: getHeaders()
  }));
}

export { getAllByUsuario, deleteRegistroMercadoria, moverMercadoria, 
  alterarQuantidadeMercadoria, saveRegistroMercadoria, getHistoricoPorMercadoria, verificarDistancias}