package com.boaentrega.mic.controller;

import com.boaentrega.mic.domain.dto.UsuarioClienteDTO;
import com.boaentrega.mic.domain.dto.UsuarioDTO;
import com.boaentrega.mic.domain.entity.Cliente;
import com.boaentrega.mic.domain.entity.Perfil;
import com.boaentrega.mic.domain.entity.Usuario;
import com.boaentrega.mic.exception.MicException;
import com.boaentrega.mic.repository.ClienteRepository;
import com.boaentrega.mic.repository.UsuarioRepository;
import com.google.common.base.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping
    public ResponseEntity<Usuario> createUsuario(@RequestBody UsuarioDTO usuarioDTO) throws MicException {
        Usuario usuario = usuarioRepository.getFirstByLoginIsLike(usuarioDTO.getLogin());
        if(usuario!=null){
            throw new MicException("Já existe um usuário com este login. ");
        }
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(usuarioDTO.getNome());
        novoUsuario.setLogin(usuarioDTO.getLogin());
        if(usuarioDTO.getIdCliente()!=null) {
            Optional<Cliente> cliente = clienteRepository.findById(usuarioDTO.getIdCliente());
            novoUsuario.setCliente(cliente.orElse(null));
        }
        if(!Strings.isNullOrEmpty(usuarioDTO.getPerfil())){
            novoUsuario.setPerfil(Perfil.valueOf(usuarioDTO.getPerfil()));
        }
        novoUsuario.setSenha(encoder.encode(usuarioDTO.getSenha()));
        return ResponseEntity.ok(usuarioRepository.save(novoUsuario));
    }

    @GetMapping("/validarSenha")
    public ResponseEntity<Boolean> validarSenha(@RequestParam String login,
                                                @RequestParam String senha) {
        Usuario usuario = usuarioRepository.getFirstByLoginIsLike(login);
        if (usuario==null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
        }
        boolean valid = encoder.matches(senha, usuario.getSenha());

        HttpStatus status = (valid) ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
        return ResponseEntity.status(status).body(valid);
    }

    @GetMapping("/{login}")
    public ResponseEntity<UsuarioClienteDTO> getUsuario(@PathVariable(value = "login") String login){
        Usuario usuario = usuarioRepository.getFirstByLoginIsLike(login);
        UsuarioClienteDTO dto = new UsuarioClienteDTO(usuario);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{login}")
    public ResponseEntity<UsuarioClienteDTO> updateUsuario(@PathVariable(value = "login") String login,
                                                                         @RequestBody UsuarioClienteDTO dto){
        Usuario usuario = usuarioRepository.getFirstByLoginIsLike(login);
        dto.atualizarUsuario(usuario);
        usuarioRepository.save(usuario);

        return ResponseEntity.ok(dto);
    }
}
