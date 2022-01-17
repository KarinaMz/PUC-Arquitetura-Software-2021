import axios from 'axios';
import { getHeaders, getUsername, BASE_URL } from './config';

const BASE_URL_MERCADORIAS = `${BASE_URL}/mercadorias`;

async function getAllByCliente() {
  return Promise.resolve(await axios.get(`${BASE_URL_MERCADORIAS}/usuario/${getUsername()}`, {
    responseType: 'json',
    headers: getHeaders()
  }));
};

async function deleteMercadoria(idMercadoria){
  return Promise.resolve(await axios.delete(`${BASE_URL_MERCADORIAS}/${idMercadoria}`, {
    responseType: 'json',
    headers: getHeaders()
  }));
};

async function editMercadoria(mercadoria){
  return Promise.resolve(await axios.put(`${BASE_URL_MERCADORIAS}`, mercadoria, {
    responseType: 'json',
    headers: getHeaders()
  }));
}

async function saveMercadoria(mercadoria){
  return Promise.resolve(await axios.post(`${BASE_URL_MERCADORIAS}`, mercadoria, {
    responseType: 'json',
    headers: getHeaders()
  }));
}

export { getAllByCliente, deleteMercadoria, editMercadoria, saveMercadoria };