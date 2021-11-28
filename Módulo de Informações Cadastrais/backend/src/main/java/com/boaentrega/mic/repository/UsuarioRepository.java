package com.boaentrega.mic.repository;

import com.boaentrega.mic.domain.entity.Usuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UsuarioRepository extends CrudRepository<Usuario, Integer> {

    Usuario getFirstByNomeIsLike(@Param("nome") String nome);
}
