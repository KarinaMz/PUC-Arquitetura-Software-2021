package com.boaentrega.mic.controller;

import com.boaentrega.mic.domain.dto.MercadoriaDepositoDTO;
import com.boaentrega.mic.domain.entity.Usuario;
import com.boaentrega.mic.repository.MercadoriaDepositoRepository;
import com.boaentrega.mic.repository.UsuarioRepository;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mercadoriasDepositos")
public class MercadoriaDepositoController {

    @Autowired
    private MercadoriaDepositoRepository mercadoriaDepositoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/")
    public List<MercadoriaDepositoDTO> getAllMercadoriasDepositos(){
        return mercadoriaDepositoRepository.getAll();
    }

    @GetMapping("/usuario/{login}")
    public ResponseEntity<List<MercadoriaDepositoDTO>> getAllByMercadoriaCliente(String login){
        Usuario usuario = usuarioRepository.getFirstByLoginIsLike(login);
        if(usuario.getCliente()==null){
            return ResponseEntity.ok(Lists.newArrayList());
        }
        return ResponseEntity.ok(mercadoriaDepositoRepository.getAllByMercadoriaCliente(usuario.getCliente().getId()));
    }

    /**@PostMapping
    public ResponseEntity<MercadoriaDepositoDTO> createMercadoriaDeposito(@RequestBody MercadoriaDepositoDTO mercadoriaDeposito) throws MicException {
        MercadoriaDeposito mercadoriaDepositoCriado = mercadoriaDepositoRepository.save(mercadoriaDeposito);
        return  ResponseEntity.status(HttpStatus.CREATED).body(mercadoriaDepositoCriado);
    }**/
}
