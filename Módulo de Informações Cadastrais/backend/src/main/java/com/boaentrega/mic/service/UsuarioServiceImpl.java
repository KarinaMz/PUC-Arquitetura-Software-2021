package com.boaentrega.mic.service;

import com.boaentrega.mic.domain.entity.Usuario;
import com.boaentrega.mic.repository.UsuarioRepository;
import com.boaentrega.mic.security.UsuarioData;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UsuarioServiceImpl implements UserDetailsService {

    private static final String MSG_USUARIO_NAO_ENCONTRADO = "Usuário %s não encontrado.";

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.getFirstByLoginIsLike(username);
        if (usuario==null) {
            throw new UsernameNotFoundException(String.format(MSG_USUARIO_NAO_ENCONTRADO, username));
        }

        return new UsuarioData(usuario);
    }
}
