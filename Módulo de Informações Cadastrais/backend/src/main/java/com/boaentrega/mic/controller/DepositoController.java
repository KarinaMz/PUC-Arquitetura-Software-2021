package com.boaentrega.mic.controller;

import com.boaentrega.mic.domain.dto.DepositoDTO;
import com.boaentrega.mic.exception.MicException;
import com.boaentrega.mic.domain.entity.Deposito;
import com.boaentrega.mic.domain.entity.MercadoriaDeposito;
import com.boaentrega.mic.repository.DepositoRepository;
import com.boaentrega.mic.repository.MercadoriaDepositoRepository;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/depositos")
public class DepositoController {

    @Autowired
    private DepositoRepository depositoRepository;

    @Autowired
    private MercadoriaDepositoRepository mercadoriaDepositoRepository;

    @GetMapping("/")
    public ResponseEntity<List<DepositoDTO>> getAllDepositos() {
        List<DepositoDTO> dtos = Lists.newArrayList();
        List<Deposito> depositos = depositoRepository.getAll();
        for(Deposito deposito : depositos){
            dtos.add(new DepositoDTO(deposito));
        }
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<DepositoDTO> createDeposito(@RequestBody DepositoDTO depositoDTO) throws MicException {
        validarCodigoDeposito(depositoDTO.getCodigo(), null);
        Deposito depositoCriado = depositoRepository.save(depositoDTO.obterNovoDeposito());
        return ResponseEntity.status(HttpStatus.CREATED).body(new DepositoDTO(depositoCriado));
    }

    @PutMapping
    public ResponseEntity<DepositoDTO> updateDeposito(@RequestBody DepositoDTO depositoDTO) throws MicException {
        validarCodigoDeposito(depositoDTO.getCodigo(), depositoDTO.getId());
        Optional<Deposito> depositoOptional = depositoRepository.findById(depositoDTO.getId());
        if(depositoOptional.isPresent()) {
            Deposito depositoRecuperado = depositoOptional.get();
            depositoDTO.atualizarDeposito(depositoRecuperado);
            depositoRepository.save(depositoRecuperado);
            return  ResponseEntity.status(HttpStatus.OK).body(depositoDTO);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteDeposito(@PathVariable("id") int idDeposito){
        List<MercadoriaDeposito> mercadoriasDeposito = mercadoriaDepositoRepository.getAllByDeposito(idDeposito);
        if(!mercadoriasDeposito.isEmpty()){
            mercadoriaDepositoRepository.deleteAll(mercadoriasDeposito);
        }
        depositoRepository.deleteById(idDeposito);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    private void validarCodigoDeposito(String codigo, Integer id) throws MicException {
        if(depositoRepository.existsDepositoByCodigoAndId(codigo, id)){
            throw new MicException("Já existe um depósito com o mesmo código");
        }
    }

}
