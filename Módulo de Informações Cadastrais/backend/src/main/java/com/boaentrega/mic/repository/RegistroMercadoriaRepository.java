package com.boaentrega.mic.repository;

import com.boaentrega.mic.domain.dto.RegistroMercadoriaDTO;
import com.boaentrega.mic.domain.entity.RegistroMercadoria;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RegistroMercadoriaRepository extends CrudRepository<RegistroMercadoria, Integer> {

    @Query(value = "select distinct new com.boaentrega.mic.domain.dto.RegistroMercadoriaDTO(md, cl.razaoSocial, me.nome) " +
            "from RegistroMercadoria md join md.mercadoria me join me.cliente cl order by cl.razaoSocial, me.nome")
    List<RegistroMercadoriaDTO> getAll();

    @Query(value = "select distinct new com.boaentrega.mic.domain.dto.RegistroMercadoriaDTO(md, cl.razaoSocial, me.nome) " +
            "from RegistroMercadoria md join md.mercadoria me join me.cliente cl where cl.id = :idCliente order by cl.razaoSocial, me.nome")
    List<RegistroMercadoriaDTO> getAllByMercadoriaCliente(@Param("idCliente") int idCliente);

    @Query(value = "select distinct md from RegistroMercadoria md join md.deposito de where de.id = :idDeposito")
    List<RegistroMercadoria> getAllByDeposito(@Param("idDeposito") int idDeposito);

    @Query(value = "select distinct md from RegistroMercadoria md join md.mercadoria me where me.id = :idMercadoria")
    List<RegistroMercadoria> getAllByMercadoria(@Param("idMercadoria") int idMercadoria);

    RegistroMercadoria getFirstByCodigo(@Param("codigo") String codigo);
}
