package com.boaentrega.mic.domain.entity;

import javax.persistence.*;

@Entity
@Table(name = "DEPOSITO", schema = "MIC")
public class Deposito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DE_ID_DEPOSITO")
    private Integer id;

    @Column(name = "DE_CODIGO")
    private String codigo;

    @ManyToOne(targetEntity = Endereco.class)
    @JoinColumn(name = "EN_ID_ENDERECO")
    private Endereco endereco;

    @Column(name = "DE_TELEFONE")
    private String telefone;

    public Deposito(){
        super();
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

}
