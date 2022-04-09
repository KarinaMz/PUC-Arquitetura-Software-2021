package com.boaentrega.mic.domain.dto;

import com.boaentrega.mic.domain.entity.Mercadoria;
import com.boaentrega.mic.domain.entity.RegistroMercadoria;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class RegistroMercadoriaDTO {

    private String loginResponsavel;

    private String codigo;
    private Integer id;
    private Integer idMercadoria;
    private String nomeMercadoria;
    private Integer idCliente;
    private String nomeCliente;
    private String tipo;

    private DepositoDTO deposito;
    private Integer quantidade;
    private EnderecoDTO destino;
    private String status;
    private String dataEntrega;
    private boolean entregue;

    public RegistroMercadoriaDTO(){
        super();
    }

    public RegistroMercadoriaDTO(RegistroMercadoria registroMercadoria, String nomeCliente, String nomeMercadoria){
        this.id = registroMercadoria.getId();
        this.quantidade = registroMercadoria.getQuantidade();
        this.deposito = new DepositoDTO(registroMercadoria.getDeposito());

        Mercadoria mercadoria = registroMercadoria.getMercadoria();
        this.idMercadoria = mercadoria.getId();
        this.nomeMercadoria = nomeMercadoria;
        this.idCliente = mercadoria.getCliente().getId();
        this.nomeCliente = nomeCliente;
        this.tipo = mercadoria.getTipo().getNome();
        this.codigo = registroMercadoria.getCodigo();

        this.destino = new EnderecoDTO(registroMercadoria.getDestino());
        this.status = registroMercadoria.getStatus().getDescricao();
        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        this.dataEntrega = registroMercadoria.getDataEntrega()!=null ?
            dateFormat.format(registroMercadoria.getDataEntrega()) : "";
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

    public String getLoginResponsavel() {
        return loginResponsavel;
    }

    public void setLoginResponsavel(String loginResponsavel) {
        this.loginResponsavel = loginResponsavel;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public EnderecoDTO getDestino() {
        return destino;
    }

    public void setDestino(EnderecoDTO destino) {
        this.destino = destino;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDataEntrega() {
        return dataEntrega;
    }

    public void setDataEntrega(String dataEntrega) {
        this.dataEntrega = dataEntrega;
    }

    public boolean isEntregue() {
        return entregue;
    }

    public void setEntregue(boolean entregue) {
        this.entregue = entregue;
    }
}
