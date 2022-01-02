package com.boaentrega.mic.repository;

import com.boaentrega.mic.domain.entity.Cliente;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ClienteRepository extends CrudRepository<Cliente, Integer> {

    @Query(value = "select distinct c from Cliente c left join fetch c.endereco order by c.razaoSocial")
    List<Cliente> getAll();

}
