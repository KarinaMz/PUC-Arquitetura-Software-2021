package com.boaentrega.mic.domain.dto;

import com.boaentrega.mic.domain.entity.Deposito;
import com.boaentrega.mic.domain.entity.Endereco;

public class DepositoDTO {

    private Integer id;
    private String codigo;
    private String telefone;

    private EnderecoDTO endereco;

    public DepositoDTO(){
        super();
    }

    public DepositoDTO(Deposito deposito) {
        this.id = deposito.getId();
        this.codigo = deposito.getCodigo();
        this.telefone = deposito.getTelefone();
        this.endereco = new EnderecoDTO(deposito.getEndereco());
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
        this.endereco.atualizarEndereco(deposito.getEndereco());
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

    public EnderecoDTO getEndereco() {
        return endereco;
    }

    public void setEndereco(EnderecoDTO endereco) {
        this.endereco = endereco;
    }
}
