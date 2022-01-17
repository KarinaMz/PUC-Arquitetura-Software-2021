import axios from 'axios';
import { getHeaders, getUsername, BASE_URL } from './config';

const BASE_URL_USUARIO = `${BASE_URL}/usuario`;

async function getUsuario() {
  return Promise.resolve(await axios.get(`${BASE_URL_USUARIO}/${getUsername()}`, {
    responseType: 'json',
    headers: getHeaders()
  }));
};

async function updateUsuario(dadosUsuario){
  return Promise.resolve(await axios.put(`${BASE_URL_USUARIO}/${getUsername()}`, dadosUsuario, {
    responseType: 'json',
    headers: getHeaders()
  }));
}

export { getUsuario, updateUsuario };