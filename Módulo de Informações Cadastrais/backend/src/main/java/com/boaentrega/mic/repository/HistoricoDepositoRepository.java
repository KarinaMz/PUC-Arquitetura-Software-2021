package com.boaentrega.mic.repository;

import com.boaentrega.mic.domain.dto.HistoricoDTO;
import com.boaentrega.mic.domain.entity.HistoricoDeposito;
import com.boaentrega.mic.domain.entity.RegistroMercadoria;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HistoricoDepositoRepository extends CrudRepository<HistoricoDeposito, Integer> {

    @Query(value = "select distinct new com.boaentrega.mic.domain.dto.HistoricoDTO(hd, hd.dataHora) " +
            "from HistoricoDeposito hd join hd.registroMercadoria rm where rm.codigo = :codigoRegistro " +
            "order by hd.dataHora desc")
    List<HistoricoDTO> getAllByRegistroMercadoria(@Param("codigoRegistro") String codigoRegistro);

    List<HistoricoDeposito> getAllByRegistroMercadoria(@Param("registroMercadoria") RegistroMercadoria registroMercadoria);
}
