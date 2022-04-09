function Home(){
    return (
        <div>
            <h1>Bem Vindo!</h1>
            <p>O seu perfil é de <strong>{localStorage.perfil}</strong>.</p>
            <p>Você possui permissão de visualizar clientes, depósitos e registros de mercadorias de clientes.</p>
        </div>
    );
}

export default Home;