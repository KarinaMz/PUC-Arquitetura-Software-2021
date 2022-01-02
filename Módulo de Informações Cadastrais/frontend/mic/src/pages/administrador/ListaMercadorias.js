import React from 'react';
import TabelaMercadorias from '../../components/TabelaMercadorias';

class ListaMercadorias extends React.Component {

    render(){
        return (
        <div>
            <h1>Lista Mercadorias Adm</h1>
            <p>Listar mercadorias indicando quanto tem em cada depósito nos detalhes.</p>
            <TabelaMercadorias/>
        </div>);
    }
}

export default ListaMercadorias;