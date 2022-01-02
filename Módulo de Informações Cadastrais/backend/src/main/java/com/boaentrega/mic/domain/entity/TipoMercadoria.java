package com.boaentrega.mic.domain.entity;

public enum TipoMercadoria {

    FRIGORIFICO("Frigorífico"),
    GERAL("Geral"),
    LIQUIDO("Líquido");

    private String nome;

    TipoMercadoria(String nome){
        this.nome = nome;
    }

    public String getNome(){
        return this.nome;
    }
}
