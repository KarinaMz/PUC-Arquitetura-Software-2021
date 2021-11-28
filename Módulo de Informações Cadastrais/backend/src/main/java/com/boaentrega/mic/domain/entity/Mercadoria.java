package com.boaentrega.mic.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "MERCADORIA", schema = "MIC")
public class Mercadoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ME_ID_MERCADORIA")
    private Integer id;

    @Column(name = "ME_NOME")
    private String nome;

    @Column(name = "ME_CODIGO")
    private String codigo;

    @Column(name = "ME_DESCRICAO")
    private String descricao;

    @ManyToOne(targetEntity = Cliente.class)
    @JoinColumn(name = "CL_ID_CLIENTE")
    private Cliente cliente;

    @Column(name = "ME_QUANTIDADE")
    private Integer quantidade;

    @Column(name = "ME_TIPO")
    @Enumerated(EnumType.STRING)
    private TipoMercadoria tipo;

    public Mercadoria(){
        super();
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

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public TipoMercadoria getTipo() {
        return tipo;
    }

    public void setTipo(TipoMercadoria tipo) {
        this.tipo = tipo;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Integer getId() {
        return id;
    }

    public String getDescricao() {
        return descricao;
    }
}
