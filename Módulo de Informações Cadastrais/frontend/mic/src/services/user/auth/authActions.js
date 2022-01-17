import * as AT from "./authTypes";
import axios from "axios";
import { getUsuario } from "../../api/usuario";

const AUTH_URL = "http://localhost:8080/login";

export const authenticateUser = (login, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(AUTH_URL, {
      login: login,
      senha: password,
    });
    localStorage.setItem("jwtToken", response.data);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("username", login);
    const dadosUsuario = (await getUsuario()).data;
    localStorage.setItem("idCliente", dadosUsuario.idCliente);
    localStorage.setItem("perfil", dadosUsuario.perfil);
    dispatch(success({ username: login, isLoggedIn: true, perfil:  dadosUsuario.perfil}));
    return Promise.resolve(response.data);
  } catch (error) {
    dispatch(failure());
    return Promise.reject(error);
  }
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutRequest());
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("idCliente");
    localStorage.removeItem("perfil");
    dispatch(success({ username: "", isLoggedIn: false, perfil: "" }));
  };
};

const loginRequest = () => {
  return {
    type: AT.LOGIN_REQUEST,
  };
};

const logoutRequest = () => {
  return {
    type: AT.LOGOUT_REQUEST,
  };
};

const success = (isLoggedIn) => {
  return {
    type: AT.SUCCESS,
    payload: isLoggedIn,
  };
};

const failure = () => {
  return {
    type: AT.FAILURE,
    payload: false,
  };
};
