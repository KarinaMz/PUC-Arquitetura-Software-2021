package com.boaentrega.mic.domain.dto;


import com.boaentrega.mic.domain.entity.Usuario;

public class UsuarioDTO {

    private String login;
    private String nome;
    private String senha;
    private String perfil;
    private Integer idCliente;

    public UsuarioDTO(){
        super();
    }

    public UsuarioDTO(Usuario usuario){
        this.login = usuario.getLogin();
        this.nome = usuario.getNome();
        this.perfil = usuario.getPerfil().name();
        this.idCliente = usuario.getCliente().getId();
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

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }
}
