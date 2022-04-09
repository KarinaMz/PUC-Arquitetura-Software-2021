import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from './administrador/Home';
import ListaClientes from './administrador/cliente/ListaClientes';
import ListaDepositos from './administrador/deposito/ListaDepositos';
import FormularioDeposito from './administrador/deposito/FormularioDeposito';
import ListaMercadorias from './administrador/mercadoria/ListaMercadorias';
import AlterarLocalRegistro from "./administrador/mercadoria/AlterarLocalRegistro";

import HomeCliente from './cliente/Home';
import ListaRegistrosMercadorias from './cliente/registroMercadoria/ListaRegistrosMercadorias';
import ListaDepositosCliente from './cliente/deposito/ListaDepositos';
import ListaMercadoriasCliente from './cliente/mercadoria/ListaMercadorias';
import FormularioMercadoria from "./cliente/mercadoria/FormularioMercadoria";

import MinhaConta from "./comum/MinhaConta";
import FormularioRegistroMercadoria from "./cliente/registroMercadoria/FormularioRegistroMercadoria";

const AdmRoutes = () => {
    return (
        <Switch>
            <Route path="/home" component={Home}/>
            <Route path="/minhaConta" component={MinhaConta}/>
            <Route path="/listaClientes" component={ListaClientes}/>
            <Route path="/listaDepositos" component={ListaDepositos}/>
            <Route path="/listaRegistrosMercadorias" exact component={ListaMercadorias}/>
            <Route path="/formularioDeposito" component={FormularioDeposito}/>
            <Route path="/listaRegistrosMercadorias/local" exact component={AlterarLocalRegistro}/>
        </Switch>
    )
}

const ClienteRoutes = () => {
    return (
        <Switch>
            <Route path="/minhaConta" component={MinhaConta}/>
            <Route path="/c/home" component={HomeCliente}/>
            <Route path="/c/listaRegistroMercadorias" component={ListaRegistrosMercadorias}/>
            <Route path="/c/listaDepositos" component={ListaDepositosCliente}/>
            <Route path="/c/listaMercadorias" component={ListaMercadoriasCliente}/>
            <Route path="/c/formularioMercadoria" component={FormularioMercadoria}/>
            <Route path="/c/formularioRegistroMercadoria" component={FormularioRegistroMercadoria}/>
        </Switch>
    )
}

export { AdmRoutes, ClienteRoutes };