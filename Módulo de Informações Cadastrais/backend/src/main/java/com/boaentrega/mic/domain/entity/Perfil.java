package com.boaentrega.mic.domain.entity;

public enum Perfil {

    ADMIN("Administrador"),
    CLIENTE("Cliente");

    private String nome;

    Perfil(String nome){
        this.nome = nome;
    }

    public String getNome(){
        return nome;
    }
}
