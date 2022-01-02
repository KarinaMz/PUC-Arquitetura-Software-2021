package com.boaentrega.mic.domain.dto;

import com.boaentrega.mic.domain.entity.Deposito;
import com.boaentrega.mic.domain.entity.MercadoriaDeposito;

public class MercadoriaDepositoDTO {

    private Integer id;
    private MercadoriaDTO mercadoria;
    private Deposito deposito;

    public MercadoriaDepositoDTO(){
        super();
    }

    public MercadoriaDepositoDTO(MercadoriaDeposito mercadoriaDeposito){
        this.id = mercadoriaDeposito.getId();
        this.deposito = mercadoriaDeposito.getDeposito();
        this.mercadoria = new MercadoriaDTO(mercadoriaDeposito.getMercadoria().getNome(),
                mercadoriaDeposito.getMercadoria());
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public MercadoriaDTO getMercadoria() {
        return mercadoria;
    }

    public void setMercadoria(MercadoriaDTO mercadoria) {
        this.mercadoria = mercadoria;
    }

    public Deposito getDeposito() {
        return deposito;
    }

    public void setDeposito(Deposito deposito) {
        this.deposito = deposito;
    }
}
