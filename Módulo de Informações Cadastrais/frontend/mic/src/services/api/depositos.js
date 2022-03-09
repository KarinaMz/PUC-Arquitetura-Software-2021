import axios from 'axios';
import { getHeaders, BASE_URL } from './config';

const BASE_URL_DEPOSITOS = `${BASE_URL}/depositos`;

async function getAllDepositos() {
  return Promise.resolve(await axios.get(`${BASE_URL_DEPOSITOS}/`, {
    responseType: 'json',
    headers: getHeaders()
  }));
};

async function deleteDeposito(idDeposito){
  return Promise.resolve(await axios.delete(`${BASE_URL_DEPOSITOS}/${idDeposito}`, {
    responseType: 'json',
    headers: getHeaders()
  }));
};

async function editDeposito(deposito){
  return Promise.resolve(await axios.put(`${BASE_URL_DEPOSITOS}`, deposito, {
    responseType: 'json',
    headers: getHeaders()
  }));
}

async function saveDeposito(deposito){
  return Promise.resolve(await axios.post(`${BASE_URL_DEPOSITOS}`, deposito, {
    responseType: 'json',
    headers: getHeaders()
  }));
}

export { getAllDepositos, deleteDeposito, editDeposito, saveDeposito };