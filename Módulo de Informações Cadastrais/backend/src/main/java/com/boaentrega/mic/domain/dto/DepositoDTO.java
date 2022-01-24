package com.boaentrega.mic.domain.dto;

import com.boaentrega.mic.domain.entity.Deposito;
import com.boaentrega.mic.domain.entity.Endereco;

public class DepositoDTO {

    private Integer id;
    private String codigo;
    private String telefone;

    private String cep;
    private String cidade;
    private String estado;
    private String bairro;
    private String logradouro;
    private Integer numero;
    private String complemento;

    public DepositoDTO(){
        super();
    }

    public DepositoDTO(Deposito deposito) {
        this.id = deposito.getId();
        this.codigo = deposito.getCodigo();
        this.telefone = deposito.getTelefone();
        this.cep = deposito.getEndereco().getCep();
        this.cidade = deposito.getEndereco().getCidade();
        this.estado = deposito.getEndereco().getEstado();
        this.bairro = deposito.getEndereco().getBairro();
        this.logradouro = deposito.getEndereco().getLogradouro();
        this.numero = deposito.getEndereco().getNumero();
        this.complemento = deposito.getEndereco().getComplemento();
    }

    public Deposito obterNovoDeposito(){
        Deposito novoDeposito = new Deposito();
        novoDeposito.setEndereco(new Endereco());
        this.atualizarDeposito(novoDeposito);
        return novoDeposito;
    }

    public void atualizarDeposito(Deposito deposito){
        deposito.setCodigo(codigo);
        deposito.setTelefone(telefone);
        Endereco endereco = deposito.getEndereco();
        endereco.setBairro(bairro);
        endereco.setCep(cep);
        endereco.setCidade(cidade);
        endereco.setComplemento(complemento);
        endereco.setEstado(estado);
        endereco.setNumero(numero);
        endereco.setLogradouro(logradouro);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
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
