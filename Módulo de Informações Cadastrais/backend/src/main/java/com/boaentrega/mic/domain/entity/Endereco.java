package com.boaentrega.mic.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "ENDERECO", schema = "MIC")
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EN_ID_ENDERECO")
    private Integer id;

    @Column(name = "EN_CEP")
    private String cep;

    @Column(name = "EN_CIDADE")
    private String cidade;

    @Column(name = "EN_ESTADO")
    private String estado;

    @Column(name = "EN_BAIRRO")
    private String bairro;

    @Column(name = "EN_LOGRADOURO")
    private String logradouro;

    @Column(name = "EN_NUMERO")
    private Integer numero;

    @Column(name = "EN_COMPLEMENTO")
    private String complemento;

    public Endereco(){
        super();
    }

    public void atualizarInformacoes(Endereco endereco){
        this.bairro = endereco.getBairro();
        this.cep = endereco.getCep();
        this.cidade = endereco.getCidade();
        this.estado = endereco.getEstado();
        this.logradouro = endereco.getLogradouro();
        this.numero = endereco.getNumero();
        this.complemento = endereco.getComplemento();
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
