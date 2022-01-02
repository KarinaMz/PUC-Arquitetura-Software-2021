package com.boaentrega.mic.repository;

import com.boaentrega.mic.domain.dto.MercadoriaDTO;
import com.boaentrega.mic.domain.entity.Mercadoria;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MercadoriaRepository extends CrudRepository<Mercadoria, Integer> {

    @Query(value = "select distinct new com.boaentrega.mic.domain.dto.MercadoriaDTO(me.nome, me) from Mercadoria me where me.cliente.id = :idCliente order by me.nome")
    List<MercadoriaDTO> getAllByCliente(@Param("idCliente") Integer idCliente);

    @Query(value = "select distinct new com.boaentrega.mic.domain.dto.MercadoriaDTO(me.nome, me) from Mercadoria me order by me.nome")
    List<MercadoriaDTO> getAll();
}
