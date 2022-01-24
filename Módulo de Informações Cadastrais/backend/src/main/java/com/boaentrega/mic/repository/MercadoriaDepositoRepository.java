package com.boaentrega.mic.repository;

import com.boaentrega.mic.domain.dto.MercadoriaDepositoDTO;
import com.boaentrega.mic.domain.entity.MercadoriaDeposito;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MercadoriaDepositoRepository extends CrudRepository<MercadoriaDeposito, Integer> {

    @Query(value = "select distinct new com.boaentrega.mic.domain.dto.MercadoriaDepositoDTO(md, cl.razaoSocial, me.nome) " +
            "from MercadoriaDeposito md join md.mercadoria me join me.cliente cl order by cl.razaoSocial, me.nome")
    List<MercadoriaDepositoDTO> getAll();

    @Query(value = "select distinct new com.boaentrega.mic.domain.dto.MercadoriaDepositoDTO(md, cl.razaoSocial, me.nome) " +
            "from MercadoriaDeposito md join md.mercadoria me join me.cliente cl where cl.id = :idCliente order by cl.razaoSocial, me.nome")
    List<MercadoriaDepositoDTO> getAllByMercadoriaCliente(@Param("idCliente") int idCliente);

    @Query(value = "select distinct md from MercadoriaDeposito md join md.deposito de where de.id = :idDeposito")
    List<MercadoriaDeposito> getAllByDeposito(@Param("idDeposito") int idDeposito);

    @Query(value = "select distinct md from MercadoriaDeposito md join md.mercadoria me where me.id = :idMercadoria")
    List<MercadoriaDeposito> getAllByMercadoria(@Param("idMercadoria") int idMercadoria);
}
