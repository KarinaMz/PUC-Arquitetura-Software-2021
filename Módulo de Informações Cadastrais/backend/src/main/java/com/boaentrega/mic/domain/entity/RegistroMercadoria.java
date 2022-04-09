package com.boaentrega.mic.domain.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "REGISTRO_MERCADORIA", schema = "MIC")
public class RegistroMercadoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RM_ID_REGISTRO_MERCADORIA")
    private Integer id;

    @Column(name = "RM_CODIGO")
    private String codigo;

    @ManyToOne(targetEntity = Mercadoria.class)
    @JoinColumn(name = "ME_ID_MERCADORIA")
    private Mercadoria mercadoria;

    @ManyToOne(targetEntity = Deposito.class)
    @JoinColumn(name = "DE_ID_DEPOSITO")
    private Deposito deposito;

    @ManyToOne(targetEntity = Endereco.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "EN_ID_ENDERECO")
    private Endereco destino;

    @Enumerated(EnumType.STRING)
    @Column(name = "RM_STATUS")
    private StatusRegistroMercadoria status = StatusRegistroMercadoria.REGISTRADO;

    @Column(name = "RM_QUANTIDADE")
    private Integer quantidade;

    @Column(name = "RM_DATA_ENTREGA")
    private Date dataEntrega;

    @ManyToOne(targetEntity = Usuario.class)
    @JoinColumn(name = "US_ID_USUARIO")
    private Usuario responsavelEntrega;

    public RegistroMercadoria(){
        super();
    }

    public boolean isEntregue(){
        return this.status == StatusRegistroMercadoria.ENTREGUE;
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

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Endereco getDestino() {
        return destino;
    }

    public void setDestino(Endereco destino) {
        this.destino = destino;
    }

    public StatusRegistroMercadoria getStatus() {
        return status;
    }

    public void setStatus(StatusRegistroMercadoria status) {
        this.status = status;
    }

    public Date getDataEntrega() {
        return dataEntrega;
    }

    public void setDataEntrega(Date dataEntrega) {
        this.dataEntrega = dataEntrega;
    }

    public Usuario getResponsavelEntrega() {
        return responsavelEntrega;
    }

    public void setResponsavelEntrega(Usuario responsavelEntrega) {
        this.responsavelEntrega = responsavelEntrega;
    }
}
