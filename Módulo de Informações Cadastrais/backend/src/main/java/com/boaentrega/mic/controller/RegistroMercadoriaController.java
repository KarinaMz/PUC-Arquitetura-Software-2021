package com.boaentrega.mic.controller;

import com.boaentrega.mic.domain.dto.DistanciaDTO;
import com.boaentrega.mic.domain.dto.EnderecoDTO;
import com.boaentrega.mic.domain.dto.HistoricoDTO;
import com.boaentrega.mic.domain.dto.RegistroMercadoriaDTO;
import com.boaentrega.mic.domain.entity.*;
import com.boaentrega.mic.repository.*;
import com.boaentrega.mic.service.DistanceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/registromercadoria")
public class RegistroMercadoriaController {

    @Autowired
    private RegistroMercadoriaRepository registroMercadoriaRepository;

    @Autowired
    private MercadoriaRepository mercadoriaRepository;

    @Autowired
    private HistoricoDepositoRepository historicoDepositoRepository;

    @Autowired
    private DepositoRepository depositoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private DistanceServiceImpl distanceService;

    @GetMapping("/")
    public List<RegistroMercadoriaDTO> getAllRegistroMercadoria(){
        return registroMercadoriaRepository.getAll();
    }

    @GetMapping("/usuario/{login}")
    public ResponseEntity<List<RegistroMercadoriaDTO>> getAllByUsuario(@PathVariable("login") String login){
        Usuario usuario = usuarioRepository.getFirstByLoginIsLike(login);
        if(usuario.getCliente()==null){
            return ResponseEntity.ok(registroMercadoriaRepository.getAll());
        }
        return ResponseEntity.ok(registroMercadoriaRepository.getAllByMercadoriaCliente(usuario.getCliente().getId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteRegistroMercadoria(@PathVariable("id") int idRegistroMercadoria){
        Optional<RegistroMercadoria> registroMercadoria = registroMercadoriaRepository.findById(idRegistroMercadoria);
        if(registroMercadoria.isPresent()){
            List<HistoricoDeposito> historicos = historicoDepositoRepository.getAllByRegistroMercadoria(registroMercadoria.get());
            historicoDepositoRepository.deleteAll(historicos);
            registroMercadoriaRepository.deleteById(idRegistroMercadoria);
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping
    public ResponseEntity<RegistroMercadoriaDTO> createRegistroMercadoria(@RequestBody RegistroMercadoriaDTO dto){
        RegistroMercadoria registro = registroMercadoriaRepository.getFirstByCodigo(dto.getCodigo());
        if(registro!=null){
            return new ResponseEntity<>(HttpStatus.PRECONDITION_FAILED);
        }
        RegistroMercadoria novoRegistroMercadoria = new RegistroMercadoria();
        novoRegistroMercadoria.setQuantidade(dto.getQuantidade());
        novoRegistroMercadoria.setCodigo(dto.getCodigo());
        novoRegistroMercadoria.setDestino(dto.getDestino().getNovoEndereco());
        Optional<Mercadoria> mercadoria = mercadoriaRepository.findById(dto.getIdMercadoria());
        if(mercadoria.isPresent()){
            novoRegistroMercadoria.setMercadoria(mercadoria.get());
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Optional<Deposito> deposito = depositoRepository.findById(dto.getDeposito().getId());
        if(deposito.isPresent()){
            novoRegistroMercadoria.setDeposito(deposito.get());
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        RegistroMercadoria registroMercadoriaSalvo = registroMercadoriaRepository.save(novoRegistroMercadoria);
        Usuario responsavel = usuarioRepository.getFirstByLoginIsLike(dto.getLoginResponsavel());
        gravarHistorico(registroMercadoriaSalvo, responsavel);
        dto = new RegistroMercadoriaDTO(registroMercadoriaSalvo,
                registroMercadoriaSalvo.getMercadoria().getCliente().getRazaoSocial(),
                registroMercadoriaSalvo.getMercadoria().getNome());
        return  ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PutMapping("/quantidade")
    public ResponseEntity<RegistroMercadoriaDTO> updateQuantidadeMercadoria(@RequestBody RegistroMercadoriaDTO dto){
        Optional<RegistroMercadoria> registroMercadoriaOptional = registroMercadoriaRepository.findById(dto.getId());
        if(registroMercadoriaOptional.isPresent()){
            RegistroMercadoria registroMercadoria = registroMercadoriaOptional.get();
            registroMercadoria.setQuantidade(dto.getQuantidade());
            registroMercadoriaRepository.save(registroMercadoria);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return  ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @PutMapping("/deposito")
    public ResponseEntity<RegistroMercadoriaDTO> updateRegistroMercadoria(@RequestBody RegistroMercadoriaDTO dto){
        Optional<RegistroMercadoria> registroMercadoriaOptional = registroMercadoriaRepository.findById(dto.getId());
        if(registroMercadoriaOptional.isPresent()){
            RegistroMercadoria registroMercadoria = registroMercadoriaOptional.get();
            Usuario responsavel = usuarioRepository.getFirstByLoginIsLike(dto.getLoginResponsavel());
            if(dto.isEntregue()){
                registroMercadoria.setStatus(StatusRegistroMercadoria.ENTREGUE);
                registroMercadoria.setDataEntrega(new Date());
                registroMercadoria.setResponsavelEntrega(responsavel);
            }
            Optional<Deposito> deposito = depositoRepository.findById(dto.getDeposito().getId());
            if(deposito.isPresent()){
                registroMercadoria.setDeposito(deposito.get());
                if(responsavel.getPerfil()==Perfil.ADMIN &&
                        registroMercadoria.getStatus()==StatusRegistroMercadoria.REGISTRADO){
                    registroMercadoria.setStatus(StatusRegistroMercadoria.EM_TRANSITO);
                }
                RegistroMercadoria registroMercadoriaSalvo = registroMercadoriaRepository.save(registroMercadoria);
                gravarHistorico(registroMercadoriaSalvo, responsavel);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return  ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @GetMapping("/{idRegistro}/{idDeposito}")
    public ResponseEntity<DistanciaDTO> verificarDistanciasDeposito(@PathVariable("idRegistro") int idRegistro,
                                                                    @PathVariable("idDeposito") int idDeposito) throws IOException {
        Optional<RegistroMercadoria> optionalRegistro = registroMercadoriaRepository.findById(idRegistro);
        Optional<Deposito> optionalDeposito = depositoRepository.findById(idDeposito);
        DistanciaDTO dto = new DistanciaDTO();
        if(optionalRegistro.isPresent()){
            RegistroMercadoria registro = optionalRegistro.get();
            dto.setLocalAtual(new EnderecoDTO(registro.getDeposito().getEndereco()));
            dto.setDestino(new EnderecoDTO(registro.getDestino()));
        }
        if(optionalDeposito.isPresent()){
            Deposito deposito = optionalDeposito.get();
            dto.setDeposito(new EnderecoDTO(deposito.getEndereco()));
        }
        distanceService.verificarDistancias(dto);
        return  ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @GetMapping("/historico/{codigo}")
    public ResponseEntity<List<HistoricoDTO>> getHistoricoRegistroMercadoria(@PathVariable("codigo") String codigoRegistro){
        List<HistoricoDTO> historicos = historicoDepositoRepository.getAllByRegistroMercadoria(codigoRegistro);
        RegistroMercadoria registro = registroMercadoriaRepository.getFirstByCodigo(codigoRegistro);
        if(registro!=null&& registro.isEntregue()){
            historicos.add(new HistoricoDTO(registro));
        }
        Collections.sort(historicos, Comparator.comparing(HistoricoDTO::getDataHora).reversed());
        return ResponseEntity.ok(historicos);
    }

    private void gravarHistorico(RegistroMercadoria registroMercadoria, Usuario responsavel){
        HistoricoDeposito historicoDeposito = new HistoricoDeposito(registroMercadoria, responsavel);
        historicoDepositoRepository.save(historicoDeposito);
    }
}
