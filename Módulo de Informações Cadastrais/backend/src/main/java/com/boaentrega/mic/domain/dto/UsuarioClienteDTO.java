package com.boaentrega.mic.domain.dto;

import com.boaentrega.mic.domain.entity.Cliente;
import com.boaentrega.mic.domain.entity.Endereco;
import com.boaentrega.mic.domain.entity.Usuario;

public class UsuarioClienteDTO {

    private String login;
    private String nome;
    private String perfil;

    private Integer idCliente;
    private String cnpj;
    private String razaoSocial;
    private String telefone;
    private String email;

    private String cep;
    private String cidade;
    private String estado;
    private String bairro;
    private String logradouro;
    private Integer numero;
    private String complemento;

    public UsuarioClienteDTO(){
        super();
    }

    public UsuarioClienteDTO(Usuario usuario){
        this.nome = usuario.getNome();
        this.login = usuario.getLogin();
        this.perfil = usuario.getPerfil().getNome();

        if(usuario.getCliente()!=null){
            Cliente cliente = usuario.getCliente();
            this.idCliente = cliente.getId();
            this.cnpj = cliente.getCnpj();
            this.razaoSocial = cliente.getRazaoSocial();
            this.telefone = cliente.getTelefone();
            this.email = cliente.getEmail();

            this.cep = cliente.getEndereco().getCep();
            this.cidade = cliente.getEndereco().getCidade();
            this.estado = cliente.getEndereco().getEstado();
            this.bairro = cliente.getEndereco().getBairro();
            this.logradouro = cliente.getEndereco().getLogradouro();
            this.numero = cliente.getEndereco().getNumero();
            this.complemento = cliente.getEndereco().getComplemento();
        }
    }

    public void atualizarUsuario(Usuario usuario){
        usuario.setNome(nome);

        if(usuario.getCliente()!=null){
            Cliente cliente = usuario.getCliente();
            cliente.setEmail(email);
            cliente.setRazaoSocial(razaoSocial);
            cliente.setTelefone(telefone);

            Endereco endereco = usuario.getCliente().getEndereco();
            endereco.setBairro(bairro);
            endereco.setCep(cep);
            endereco.setCidade(cidade);
            endereco.setComplemento(complemento);
            endereco.setEstado(estado);
            endereco.setNumero(numero);
            endereco.setLogradouro(logradouro);
        }
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getPerfil() {
        return perfil;
    }

    public void setPerfil(String perfil) {
        this.perfil = perfil;
    }

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }
}
