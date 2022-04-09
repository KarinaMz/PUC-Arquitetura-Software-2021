package com.boaentrega.mic.domain.dto;

public class DistanciaDTO {

    private EnderecoDTO localAtual;

    private String distanciaAteDeposito;
    private String tempoAteDeposito;

    private EnderecoDTO deposito;

    private String distanciaDepositoDestino;
    private String tempoDepositoDestino;

    private EnderecoDTO destino;

    public DistanciaDTO(){
        super();
    }

    public EnderecoDTO getLocalAtual() {
        return localAtual;
    }

    public void setLocalAtual(EnderecoDTO localAtual) {
        this.localAtual = localAtual;
    }

    public String getDistanciaAteDeposito() {
        return distanciaAteDeposito;
    }

    public void setDistanciaAteDeposito(String distanciaAteDeposito) {
        this.distanciaAteDeposito = distanciaAteDeposito;
    }

    public String getTempoAteDeposito() {
        return tempoAteDeposito;
    }

    public void setTempoAteDeposito(String tempoAteDeposito) {
        this.tempoAteDeposito = tempoAteDeposito;
    }

    public EnderecoDTO getDeposito() {
        return deposito;
    }

    public void setDeposito(EnderecoDTO deposito) {
        this.deposito = deposito;
    }

    public String getDistanciaDepositoDestino() {
        return distanciaDepositoDestino;
    }

    public void setDistanciaDepositoDestino(String distanciaDepositoDestino) {
        this.distanciaDepositoDestino = distanciaDepositoDestino;
    }

    public String getTempoDepositoDestino() {
        return tempoDepositoDestino;
    }

    public void setTempoDepositoDestino(String tempoDepositoDestino) {
        this.tempoDepositoDestino = tempoDepositoDestino;
    }

    public EnderecoDTO getDestino() {
        return destino;
    }

    public void setDestino(EnderecoDTO destino) {
        this.destino = destino;
    }
}
