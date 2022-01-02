package com.boaentrega.mic.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "USUARIO", schema = "MIC")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "US_ID_USUARIO")
    private Integer id;

    @Column(name = "US_LOGIN")
    private String login;

    @Column(name = "US_NOME")
    private String nome;

    @Column(name = "US_SENHA")
    private String senha;

    @Column(name = "US_PERFIL")
    @Enumerated(EnumType.STRING)
    private Perfil perfil;

    @ManyToOne(targetEntity = Cliente.class)
    @JoinColumn(name = "CL_ID_CLIENTE")
    private Cliente cliente;

    public Usuario(){
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Perfil getPerfil() {
        return perfil;
    }

    public void setPerfil(Perfil perfil) {
        this.perfil = perfil;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }
}
