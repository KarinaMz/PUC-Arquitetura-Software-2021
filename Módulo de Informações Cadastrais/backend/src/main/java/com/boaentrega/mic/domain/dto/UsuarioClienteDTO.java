package com.boaentrega.mic.domain.dto;

import com.boaentrega.mic.domain.entity.Cliente;
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

    private EnderecoDTO endereco;

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
            this.endereco = new EnderecoDTO(cliente.getEndereco());
        }
    }

    public void atualizarUsuario(Usuario usuario){
        usuario.setNome(nome);

        if(usuario.getCliente()!=null){
            Cliente cliente = usuario.getCliente();
            cliente.setEmail(email);
            cliente.setRazaoSocial(razaoSocial);
            cliente.setTelefone(telefone);
            this.endereco.atualizarEndereco(usuario.getCliente().getEndereco());
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

    public EnderecoDTO getEndereco() {
        return endereco;
    }

    public void setEndereco(EnderecoDTO endereco) {
        this.endereco = endereco;
    }
}
