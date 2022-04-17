import React from 'react';
import PublicRoutes from './pages/PublicRoutes';
import MenuAdm from './pages/administrador/BarraMenuAdm';
import MenuCliente from './pages/cliente/BarraMenuCliente'
import { AdmRoutes, ClienteRoutes } from "./pages/PrivateRoutes";
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

const App = () => {
    const perfil = localStorage.perfil;
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    
    function AppPage() {
        if (isLoggedIn || perfil) {
            if(perfil==='Administrador'){
                return (
                    <div>
                        <MenuAdm /> 
                        <div style={{padding: '50px 50px 0 50px'}}>
                            <AdmRoutes/>
                        </div>
                    </div>);
            } 
            if(perfil==='Cliente'){
                return (
                    <div>
                        <MenuCliente /> 
                        <div style={{padding: '50px 50px 0 50px'}}>
                            <ClienteRoutes/>
                        </div>
                    </div>);
            }
        } 
        return (
            <div>
                <PublicRoutes/>
                <Redirect to="/"/>
            </div>
        );
    }

    return (
        <AppPage />
    );
}

export default App;