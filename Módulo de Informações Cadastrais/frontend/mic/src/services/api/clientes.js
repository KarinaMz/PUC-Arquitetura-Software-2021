import axios from 'axios';
import { BASE_URL, getHeaders } from './config';

const BASE_URL_CLIENTES = `${BASE_URL}/clientes`;

async function getAllClientes() {
  return Promise.resolve(await axios.get(`${BASE_URL_CLIENTES}/`, {
    responseType: 'json',
    headers: getHeaders()
  }));
};

export { getAllClientes }