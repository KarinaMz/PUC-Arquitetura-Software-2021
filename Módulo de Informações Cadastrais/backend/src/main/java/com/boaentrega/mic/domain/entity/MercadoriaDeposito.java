package com.boaentrega.mic.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "MERCADORIA_DEPOSITO", schema = "MIC")
public class MercadoriaDeposito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MD_ID_MERCADORIA_DEPOSITO")
    private Integer id;

    @ManyToOne(targetEntity = Mercadoria.class)
    @JoinColumn(name = "ME_ID_MERCADORIA")
    private Mercadoria mercadoria;

    @ManyToOne(targetEntity = Deposito.class)
    @JoinColumn(name = "DE_ID_DEPOSITO")
    private Deposito deposito;

    @Column(name = "MD_QUANTIDADE")
    private Integer quantidade;

    public MercadoriaDeposito(){
        super();
    }

    public Mercadoria getMercadoria() {
        return mercadoria;
    }

    public void setMercadoria(Mercadoria mercadoria) {
        this.mercadoria = mercadoria;
    }

    public Deposito getDeposito() {
        return deposito;
    }

    public void setDeposito(Deposito deposito) {
        this.deposito = deposito;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
