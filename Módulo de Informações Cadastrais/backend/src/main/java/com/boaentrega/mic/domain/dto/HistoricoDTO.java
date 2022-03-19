package com.boaentrega.mic.domain.dto;

import com.boaentrega.mic.domain.entity.HistoricoDeposito;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class HistoricoDTO {

    private String codigo;
    private String dataHora;
    private String nomeMercadoria;
    private String nomeResponsavel;
    private DepositoDTO depositoDTO;

    public HistoricoDTO(HistoricoDeposito historico, Date dataHora){
        this.codigo = historico.getMercadoriaDeposito().getCodigo();
        DateFormat dateFormat = new SimpleDateFormat("dd/mm/yyyy hh:mm");
        this.dataHora = dateFormat.format(dataHora);
        this.depositoDTO = new DepositoDTO(historico.getDeposito());
        this.nomeMercadoria = historico.getMercadoriaDeposito().getMercadoria().getNome();
        this.nomeResponsavel = historico.getResponsavel().getNome();
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

    public DepositoDTO getDepositoDTO() {
        return depositoDTO;
    }

    public void setDepositoDTO(DepositoDTO depositoDTO) {
        this.depositoDTO = depositoDTO;
    }
}
