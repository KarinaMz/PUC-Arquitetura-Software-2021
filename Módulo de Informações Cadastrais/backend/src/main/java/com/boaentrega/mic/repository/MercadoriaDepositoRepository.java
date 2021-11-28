package com.boaentrega.mic.repository;

import com.boaentrega.mic.domain.entity.MercadoriaDeposito;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MercadoriaDepositoRepository extends CrudRepository<MercadoriaDeposito, Integer> {

    @Query(value = "select distinct md from MercadoriaDeposito md order by md.deposito.codigo, md.mercadoria.nome")
    List<MercadoriaDeposito> getAll();

    @Query(value = "select distinct md from MercadoriaDeposito md join md.mercadoria me join me.cliente cl where cl.id = :idCliente order by me.nome")
    List<MercadoriaDeposito> getAllByMercadoriaCliente(@Param("idCliente") String idCliente);
}
