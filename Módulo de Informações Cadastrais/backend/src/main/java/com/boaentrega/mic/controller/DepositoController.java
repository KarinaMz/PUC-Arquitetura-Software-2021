package com.boaentrega.mic.controller;

import com.boaentrega.mic.exception.MicException;
import com.boaentrega.mic.domain.entity.Deposito;
import com.boaentrega.mic.domain.entity.MercadoriaDeposito;
import com.boaentrega.mic.repository.DepositoRepository;
import com.boaentrega.mic.repository.MercadoriaDepositoRepository;
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
    public ResponseEntity<List<Deposito>> getAllDepositos() {
        return ResponseEntity.ok(depositoRepository.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Deposito> getDepositoById(@PathVariable("id") int idDeposito){
        Optional<Deposito> depositoOptional = depositoRepository.findById(idDeposito);
        return depositoOptional.isPresent() ? ResponseEntity.ok(depositoOptional.get()) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Deposito> createDeposito(@RequestBody Deposito deposito) throws MicException {
        validarCodigoDeposito(deposito.getCodigo());
        Deposito depositoCriado = depositoRepository.save(deposito);
        return  ResponseEntity.status(HttpStatus.CREATED).body(depositoCriado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Deposito> updateDeposito(@PathVariable("id") int idDeposito,
                                                   @RequestBody Deposito deposito) throws MicException {
        validarCodigoDeposito(deposito.getCodigo());
        Optional<Deposito> depositoOptional = depositoRepository.findById(idDeposito);
        if(depositoOptional.isPresent()) {
            Deposito depositoRecuperado = depositoOptional.get();
            depositoRecuperado.atualizarInformacoes(deposito);
            depositoRepository.save(depositoRecuperado);
            return  ResponseEntity.status(HttpStatus.OK).body(deposito);
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

    private void validarCodigoDeposito(String codigo) throws MicException {
        if(depositoRepository.existsDepositoByCodigo(codigo)){
            throw new MicException("Já existe um depósito com o mesmo código");
        }
    }

}
