package com.boaentrega.mic.domain.entity;

import com.boaentrega.mic.domain.dto.MercadoriaDTO;

import javax.persistence.*;

@Entity
@Table(name = "MERCADORIA", schema = "MIC")
public class Mercadoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ME_ID_MERCADORIA")
    private Integer id;

    @Column(name = "ME_NOME")
    private String nome;

    @Column(name = "ME_CODIGO")
    private String codigo;

    @Column(name = "ME_DESCRICAO")
    private String descricao;

    @ManyToOne(targetEntity = Cliente.class)
    @JoinColumn(name = "CL_ID_CLIENTE")
    private Cliente cliente;

    @Column(name = "ME_TIPO")
    @Enumerated(EnumType.STRING)
    private TipoMercadoria tipo;

    public Mercadoria(){
        super();
    }

    public void atualizarInformacoes(MercadoriaDTO mercadoriaDTO){
        this.nome = mercadoriaDTO.getNome();
        this.codigo = mercadoriaDTO.getCodigo();
        this.descricao = mercadoriaDTO.getDescricao();
        this.tipo = TipoMercadoria.valueOf(mercadoriaDTO.getTipo());
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public TipoMercadoria getTipo() {
        return tipo;
    }

    public void setTipo(TipoMercadoria tipo) {
        this.tipo = tipo;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Integer getId() {
        return id;
    }

    public String getDescricao() {
        return descricao;
    }
}
