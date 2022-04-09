package com.boaentrega.mic.domain.entity;

public enum StatusRegistroMercadoria {

    REGISTRADO("Registrado"),
    EM_TRANSITO("Em trânsito"),
    ENTREGUE("Entregue");

    private String descricao;

    StatusRegistroMercadoria(String descricao){
        this.descricao = descricao;
    }

    public String getDescricao(){
        return this.descricao;
    }
}
