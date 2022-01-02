package com.boaentrega.mic.repository;

import com.boaentrega.mic.domain.entity.Deposito;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DepositoRepository extends CrudRepository<Deposito, Integer> {

    @Query(value = "select distinct de from Deposito de left join fetch de.endereco order by de.codigo")
    List<Deposito> getAll();

    Boolean existsDepositoByCodigo(@Param("codigo") String codigo);
}
