package com.boaentrega.mic.domain.dto;

import com.boaentrega.mic.domain.entity.Endereco;

public class EnderecoDTO {

    private String cep;
    private String cidade;
    private String estado;
    private String bairro;
    private String logradouro;
    private Integer numero;
    private String complemento;

    public EnderecoDTO(){ super(); }

    public EnderecoDTO(Endereco endereco){
        this.cep = endereco.getCep();
        this.cidade = endereco.getCidade();
        this.estado = endereco.getEstado();
        this.bairro = endereco.getBairro();
        this.logradouro = endereco.getLogradouro();
        this.numero = endereco.getNumero();
        this.complemento = endereco.getComplemento();
    }

    public void atualizarEndereco(Endereco endereco){
        endereco.setBairro(bairro);
        endereco.setCep(cep);
        endereco.setCidade(cidade);
        endereco.setComplemento(complemento);
        endereco.setEstado(estado);
        endereco.setNumero(numero);
        endereco.setLogradouro(logradouro);
    }

    public Endereco getNovoEndereco(){
        Endereco endereco = new Endereco();
        endereco.setBairro(bairro);
        endereco.setCep(cep);
        endereco.setCidade(cidade);
        endereco.setComplemento(complemento);
        endereco.setEstado(estado);
        endereco.setNumero(numero);
        endereco.setLogradouro(logradouro);
        return endereco;
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
