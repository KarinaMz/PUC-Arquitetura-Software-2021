package com.boaentrega.mic.repository;

import com.boaentrega.mic.domain.entity.Deposito;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DepositoRepository extends CrudRepository<Deposito, Integer> {

    @Query(value = "select distinct de from Deposito de left join fetch de.endereco order by de.codigo")
    List<Deposito> getAll();

    @Query(value = "select case when (count(d) > 0) then true else false end " +
            "from Deposito d where d.codigo = :codigo " +
            "and (:id is null or d.id != :id)")
    Boolean existsDepositoByCodigoAndId(@Param("codigo") String codigo, @Param("id") Integer id);
}
