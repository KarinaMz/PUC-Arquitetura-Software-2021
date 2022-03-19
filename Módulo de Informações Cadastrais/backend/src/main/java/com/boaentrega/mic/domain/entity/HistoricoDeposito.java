package com.boaentrega.mic.domain.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "HISTORICO_DEPOSITO", schema = "MIC")
public class HistoricoDeposito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "HD_ID_HISTORICO_DEPOSITO")
    private Integer id;

    @ManyToOne(targetEntity = MercadoriaDeposito.class)
    @JoinColumn(name = "MD_ID_MERCADORIA_DEPOSITO")
    private MercadoriaDeposito mercadoriaDeposito;

    @Column(name = "HD_DATA_HORA")
    private Date dataHora;

    @ManyToOne(targetEntity = Deposito.class)
    @JoinColumn(name = "DE_ID_DEPOSITO")
    private Deposito deposito;

    @ManyToOne(targetEntity = Usuario.class)
    @JoinColumn(name = "US_ID_USUARIO")
    private Usuario responsavel;

    public HistoricoDeposito(){
        super();
    }

    public HistoricoDeposito(MercadoriaDeposito mercadoriaDeposito, Usuario responsavel){
        this.mercadoriaDeposito = mercadoriaDeposito;
        this.dataHora = new Date();
        this.deposito = mercadoriaDeposito.getDeposito();
        this.responsavel = responsavel;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public MercadoriaDeposito getMercadoriaDeposito() {
        return mercadoriaDeposito;
    }

    public void setMercadoriaDeposito(MercadoriaDeposito mercadoriaDeposito) {
        this.mercadoriaDeposito = mercadoriaDeposito;
    }

    public Date getDataHora() {
        return dataHora;
    }

    public void setDataHora(Date dataHora) {
        this.dataHora = dataHora;
    }

    public Deposito getDeposito() {
        return deposito;
    }

    public void setDeposito(Deposito deposito) {
        this.deposito = deposito;
    }

    public Usuario getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(Usuario responsavel) {
        this.responsavel = responsavel;
    }
}
