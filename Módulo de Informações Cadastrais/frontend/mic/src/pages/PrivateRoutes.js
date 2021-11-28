import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from './administrador/Home';
import ListaClientes from './administrador/ListaClientes';
import ListaDepositos from './administrador/ListaDepositos';
import ListaMercadorias from './administrador/ListaMercadorias';

const Routes = () => {
    return (
        <Switch>
            <Route path="/home" component={Home}/>
            <Route path="/listaClientes" component={ListaClientes}/>
            <Route path="/listaDepositos" component={ListaDepositos}/>
            <Route path="/listaMercadorias" component={ListaMercadorias}/>
        </Switch>
    )
}

export default Routes;