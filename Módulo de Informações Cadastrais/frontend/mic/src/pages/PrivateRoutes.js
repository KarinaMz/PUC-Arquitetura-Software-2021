import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from './administrador/Home';
import ListaClientes from './administrador/cliente/ListaClientes';
import ListaDepositos from './administrador/deposito/ListaDepositos';
import FormularioDeposito from './administrador/deposito/FormularioDeposito';
import ListaMercadorias from './administrador/mercadoria/ListaMercadorias';

import HomeCliente from './cliente/Home';
import ListaMercadoriasDeposito from './cliente/mercadoriaDeposito/ListaMercadoriasDeposito';
import ListaDepositosCliente from './cliente/deposito/ListaDepositos';
import ListaMercadoriasCliente from './cliente/mercadoria/ListaMercadorias';
import FormularioMercadoria from "./cliente/mercadoria/FormularioMercadoria";

import MinhaConta from "./comum/MinhaConta";

const AdmRoutes = () => {
    return (
        <Switch>
            <Route path="/home" component={Home}/>
            <Route path="/minhaConta" component={MinhaConta}/>
            <Route path="/listaClientes" component={ListaClientes}/>
            <Route path="/listaDepositos" component={ListaDepositos}/>
            <Route path="/listaMercadorias" component={ListaMercadorias}/>
            <Route path="/formularioDeposito" component={FormularioDeposito}/>
        </Switch>
    )
}

const ClienteRoutes = () => {
    return (
        <Switch>
            <Route path="/minhaConta" component={MinhaConta}/>
            <Route path="/c/home" component={HomeCliente}/>
            <Route path="/c/listaMercadoriasDeposito" component={ListaMercadoriasDeposito}/>
            <Route path="/c/listaDepositos" component={ListaDepositosCliente}/>
            <Route path="/c/listaMercadorias" component={ListaMercadoriasCliente}/>
            <Route path="/c/formularioMercadoria" component={FormularioMercadoria}/>
        </Switch>
    )
}

export { AdmRoutes, ClienteRoutes };