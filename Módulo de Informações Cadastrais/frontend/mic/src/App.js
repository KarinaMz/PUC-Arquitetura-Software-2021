import React from 'react';
import PrivateRoutes from './pages/PrivateRoutes';
import PublicRoutes from './pages/PublicRoutes';
import Menu from './components/BarraMenuAdm';
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
    const username = useSelector((state) => state.auth.username);
    const isLoggedIn = localStorage.isLoggedIn;
    function AppPage() {
        if (isLoggedIn) {
            return (
                <div>
                    <BrowserRouter>
                        <Menu /> 
                        <div style={{padding: '50px 50px 0 50px'}}>
                            <PrivateRoutes/>
                        </div>
                    </BrowserRouter>
                </div>);
        }
        return (
        <BrowserRouter> 
            <PublicRoutes/>
            )
        </BrowserRouter>);
    }

    return (
        <AppPage />
    );
}

export default App;