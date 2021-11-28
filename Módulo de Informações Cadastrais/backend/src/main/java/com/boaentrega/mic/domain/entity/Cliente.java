package com.boaentrega.mic.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "CLIENTE", schema = "MIC")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CL_ID_CLIENTE")
    private Integer id;

    @Column(name = "CL_CNPJ")
    private String cnpj;

    @Column(name = "CL_RAZAO_SOCIAL")
    private String razaoSocial;

    @Column(name = "CL_TELEFONE")
    private String telefone;

    @Column(name = "CL_EMAIL")
    private String email;

    @ManyToOne(targetEntity = Endereco.class)
    @JoinColumn(name = "EN_ID_ENDERECO")
    private Endereco endereco;

    public Cliente(){
        super();
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

    public Endereco getEndereco() {
        return endereco;
    }

    public Integer getId() {
        return id;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
