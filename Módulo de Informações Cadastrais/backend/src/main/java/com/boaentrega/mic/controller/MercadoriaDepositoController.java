package com.boaentrega.mic.controller;

import com.boaentrega.mic.domain.dto.MercadoriaDepositoDTO;
import com.boaentrega.mic.domain.entity.*;
import com.boaentrega.mic.repository.DepositoRepository;
import com.boaentrega.mic.repository.MercadoriaDepositoRepository;
import com.boaentrega.mic.repository.MercadoriaRepository;
import com.boaentrega.mic.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mercadoriasDepositos")
public class MercadoriaDepositoController {

    @Autowired
    private MercadoriaDepositoRepository mercadoriaDepositoRepository;

    @Autowired
    private MercadoriaRepository mercadoriaRepository;

    @Autowired
    private DepositoRepository depositoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/")
    public List<MercadoriaDepositoDTO> getAllMercadoriasDepositos(){
        return mercadoriaDepositoRepository.getAll();
    }

    @GetMapping("/usuario/{login}")
    public ResponseEntity<List<MercadoriaDepositoDTO>> getAllByUsuario(@PathVariable("login") String login){
        Usuario usuario = usuarioRepository.getFirstByLoginIsLike(login);
        if(usuario.getCliente()==null){
            return ResponseEntity.ok(mercadoriaDepositoRepository.getAll());
        }
        return ResponseEntity.ok(mercadoriaDepositoRepository.getAllByMercadoriaCliente(usuario.getCliente().getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteMercadoriaDeposito(@PathVariable("id") int idMercadoriaDeposito){
        Optional<MercadoriaDeposito> mercadoriaDeposito = mercadoriaDepositoRepository.findById(idMercadoriaDeposito);
        if(mercadoriaDeposito.isPresent()){
            mercadoriaDepositoRepository.deleteById(idMercadoriaDeposito);
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping
    public ResponseEntity<MercadoriaDepositoDTO> createMercadoria(@RequestBody MercadoriaDepositoDTO dto){
        MercadoriaDeposito novaMercadoriaDeposito = new MercadoriaDeposito();
        novaMercadoriaDeposito.setQuantidade(dto.getQuantidade());
        Optional<Mercadoria> mercadoria = mercadoriaRepository.findById(dto.getIdMercadoria());
        if(mercadoria.isPresent()){
            novaMercadoriaDeposito.setMercadoria(mercadoria.get());
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Optional<Deposito> deposito = depositoRepository.findById(dto.getDeposito().getId());
        if(deposito.isPresent()){
            novaMercadoriaDeposito.setDeposito(deposito.get());
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        MercadoriaDeposito mercadoriaDepositoSalva = mercadoriaDepositoRepository.save(novaMercadoriaDeposito);
        dto = new MercadoriaDepositoDTO(mercadoriaDepositoSalva,
                mercadoriaDepositoSalva.getMercadoria().getCliente().getRazaoSocial(),
                mercadoriaDepositoSalva.getMercadoria().getNome());
        return  ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PutMapping("/quantidade")
    public ResponseEntity<MercadoriaDepositoDTO> updateQuantidadeMercadoria(@RequestBody MercadoriaDepositoDTO dto){
        Optional<MercadoriaDeposito> mercadoriaDepositoOptional = mercadoriaDepositoRepository.findById(dto.getId());
        if(mercadoriaDepositoOptional.isPresent()){
            MercadoriaDeposito mercadoriaDeposito = mercadoriaDepositoOptional.get();
            mercadoriaDeposito.setQuantidade(dto.getQuantidade());
            mercadoriaDepositoRepository.save(mercadoriaDeposito);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return  ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @PutMapping("/deposito")
    public ResponseEntity<MercadoriaDepositoDTO> updateDepositoMercadoria(@RequestBody MercadoriaDepositoDTO dto){
        Optional<MercadoriaDeposito> mercadoriaDepositoOptional = mercadoriaDepositoRepository.findById(dto.getId());
        if(mercadoriaDepositoOptional.isPresent()){
            MercadoriaDeposito mercadoriaDeposito = mercadoriaDepositoOptional.get();
            Optional<Deposito> deposito = depositoRepository.findById(dto.getDeposito().getId());
            if(deposito.isPresent()){
                mercadoriaDeposito.setDeposito(deposito.get());
                mercadoriaDepositoRepository.save(mercadoriaDeposito);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return  ResponseEntity.status(HttpStatus.OK).body(dto);
    }
}
