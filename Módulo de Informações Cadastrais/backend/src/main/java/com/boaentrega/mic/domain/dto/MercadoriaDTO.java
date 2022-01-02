package com.boaentrega.mic.domain.dto;

import com.boaentrega.mic.domain.entity.Mercadoria;

public class MercadoriaDTO {

    private Integer id;
    private String nome;
    private String codigo;
    private String descricao;
    private Integer idCliente;
    private String tipo;

    public MercadoriaDTO(){
        super();
    }

    public MercadoriaDTO(String nome, Mercadoria mercadoria) {
        this.id = mercadoria.getId();
        this.nome = nome;
        this.codigo = mercadoria.getCodigo();
        this.descricao = mercadoria.getDescricao();
        this.idCliente = mercadoria.getCliente().getId();
        this.tipo = mercadoria.getTipo().getNome();
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

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
