package com.boaentrega.mic.domain.dto;

import com.boaentrega.mic.domain.entity.Mercadoria;
import com.boaentrega.mic.domain.entity.MercadoriaDeposito;

public class MercadoriaDepositoDTO {

    private Integer id;
    private Integer idMercadoria;
    private String nomeMercadoria;
    private Integer idCliente;
    private String nomeCliente;
    private String tipo;

    private DepositoDTO deposito;
    private Integer quantidade;

    public MercadoriaDepositoDTO(){
        super();
    }

    public MercadoriaDepositoDTO(MercadoriaDeposito mercadoriaDeposito, String nomeCliente, String nomeMercadoria){
        this.id = mercadoriaDeposito.getId();
        this.quantidade = mercadoriaDeposito.getQuantidade();
        this.deposito = new DepositoDTO(mercadoriaDeposito.getDeposito());

        Mercadoria mercadoria = mercadoriaDeposito.getMercadoria();
        this.idMercadoria = mercadoria.getId();
        this.nomeMercadoria = nomeMercadoria;
        this.idCliente = mercadoria.getCliente().getId();
        this.nomeCliente = nomeCliente;
        this.tipo = mercadoria.getTipo().getNome();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public DepositoDTO getDeposito() {
        return deposito;
    }

    public void setDeposito(DepositoDTO deposito) {
        this.deposito = deposito;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Integer getIdMercadoria() {
        return idMercadoria;
    }

    public void setIdMercadoria(Integer idMercadoria) {
        this.idMercadoria = idMercadoria;
    }

    public String getNomeMercadoria() {
        return nomeMercadoria;
    }

    public void setNomeMercadoria(String nomeMercadoria) {
        this.nomeMercadoria = nomeMercadoria;
    }

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
