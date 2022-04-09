function Home(){
    return (
        <div>
            <h1>Bem Vindo!</h1>
            <p>O seu perfil é de <strong>{localStorage.perfil}</strong>.</p>
            <p>Você possui permissão de visualizar depósitos, cadastrar as suas mercadorias 
                e registros de mercadorias para entrega.</p>
        </div>
    );
}

export default Home;