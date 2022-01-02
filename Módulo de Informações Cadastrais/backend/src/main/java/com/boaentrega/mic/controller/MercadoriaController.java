package com.boaentrega.mic.controller;

import com.boaentrega.mic.domain.dto.MercadoriaDTO;
import com.boaentrega.mic.domain.entity.*;
import com.boaentrega.mic.repository.ClienteRepository;
import com.boaentrega.mic.repository.MercadoriaDepositoRepository;
import com.boaentrega.mic.repository.MercadoriaRepository;
import com.boaentrega.mic.repository.UsuarioRepository;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mercadorias")
public class MercadoriaController {

    @Autowired
    private MercadoriaRepository mercadoriaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MercadoriaDepositoRepository mercadoriaDepositoRepository;

    @GetMapping("/usuario/{login}")
    public ResponseEntity<List<MercadoriaDTO>> getMercadoriasByUsuario(@PathVariable("login") String login){
        Usuario usuario = usuarioRepository.getFirstByLoginIsLike(login);
        if(usuario.getCliente()==null){
            return ResponseEntity.ok(Lists.newArrayList());
        }
        return ResponseEntity.ok(mercadoriaRepository.getAllByCliente(usuario.getCliente().getId()));
    }

    @PostMapping
    public ResponseEntity<MercadoriaDTO> createMercadoria(@RequestBody MercadoriaDTO dto){
        Cliente cliente = clienteRepository.findById(dto.getIdCliente()).get();
        Mercadoria novaMercadoria = new Mercadoria();
        novaMercadoria.atualizarInformacoes(dto);
        novaMercadoria.setCliente(cliente);
        Mercadoria mercadoriaSalva = mercadoriaRepository.save(novaMercadoria);
        dto = new MercadoriaDTO(mercadoriaSalva.getNome(), mercadoriaSalva);
        return  ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PutMapping
    public ResponseEntity<MercadoriaDTO> updateMercadoria(@RequestBody MercadoriaDTO dto){
        Optional<Mercadoria> mercadoriaOptional = mercadoriaRepository.findById(dto.getId());
        if(mercadoriaOptional.isPresent()) {
            Mercadoria mercadoriaRecuperado = mercadoriaOptional.get();
            mercadoriaRecuperado.atualizarInformacoes(dto);
            Mercadoria mercadoriaSalva = mercadoriaRepository.save(mercadoriaRecuperado);
            dto = new MercadoriaDTO(mercadoriaSalva.getNome(), mercadoriaSalva);
            return  ResponseEntity.status(HttpStatus.OK).body(dto);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteMercadoria(@PathVariable("id") int idMercadoria){
        List<MercadoriaDeposito> mercadoriasDeposito = mercadoriaDepositoRepository.getAllByMercadoria(idMercadoria);
        if(!mercadoriasDeposito.isEmpty()){
            mercadoriaDepositoRepository.deleteAll(mercadoriasDeposito);
        }
        mercadoriaRepository.deleteById(idMercadoria);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
