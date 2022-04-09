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

    @ManyToOne(targetEntity = RegistroMercadoria.class)
    @JoinColumn(name = "RM_ID_REGISTRO_MERCADORIA")
    private RegistroMercadoria registroMercadoria;

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

    public HistoricoDeposito(RegistroMercadoria registroMercadoria, Usuario responsavel){
        this.registroMercadoria = registroMercadoria;
        this.dataHora = new Date();
        this.deposito = registroMercadoria.getDeposito();
        this.responsavel = responsavel;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public RegistroMercadoria getRegistroMercadoria() {
        return registroMercadoria;
    }

    public void setRegistroMercadoria(RegistroMercadoria registroMercadoria) {
        this.registroMercadoria = registroMercadoria;
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
