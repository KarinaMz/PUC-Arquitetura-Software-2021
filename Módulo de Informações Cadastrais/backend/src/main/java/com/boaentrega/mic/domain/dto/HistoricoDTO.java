package com.boaentrega.mic.domain.dto;

import com.boaentrega.mic.domain.entity.HistoricoDeposito;
import com.boaentrega.mic.domain.entity.RegistroMercadoria;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class HistoricoDTO {

    private String codigo;
    private String dataHora;
    private String nomeMercadoria;
    private String nomeResponsavel;
    private String codigoDeposito;
    private EnderecoDTO endereco;

    public HistoricoDTO(HistoricoDeposito historico, Date dataHora){
        this.codigo = historico.getRegistroMercadoria().getCodigo();
        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        this.dataHora = dateFormat.format(dataHora);
        this.endereco = new EnderecoDTO(historico.getDeposito().getEndereco());
        this.nomeMercadoria = historico.getRegistroMercadoria().getMercadoria().getNome();
        this.nomeResponsavel = historico.getResponsavel().getNome();
        this.codigoDeposito = historico.getDeposito().getCodigo();
    }

    public HistoricoDTO(RegistroMercadoria registro){
        this.codigo = registro.getCodigo();
        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        this.dataHora = dateFormat.format(registro.getDataEntrega());
        this.endereco = new EnderecoDTO(registro.getDestino());
        this.nomeMercadoria = registro.getMercadoria().getNome();
        this.nomeResponsavel = registro.getResponsavelEntrega().getNome();
    }

    public HistoricoDTO(){
        super();
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDataHora() {
        return dataHora;
    }

    public void setDataHora(String dataHora) {
        this.dataHora = dataHora;
    }

    public String getNomeMercadoria() {
        return nomeMercadoria;
    }

    public void setNomeMercadoria(String nomeMercadoria) {
        this.nomeMercadoria = nomeMercadoria;
    }

    public String getNomeResponsavel() {
        return nomeResponsavel;
    }

    public void setNomeResponsavel(String nomeResponsavel) {
        this.nomeResponsavel = nomeResponsavel;
    }

    public String getCodigoDeposito() {
        return codigoDeposito;
    }

    public void setCodigoDeposito(String codigoDeposito) {
        this.codigoDeposito = codigoDeposito;
    }

    public EnderecoDTO getEndereco() {
        return endereco;
    }

    public void setEndereco(EnderecoDTO endereco) {
        this.endereco = endereco;
    }
}
