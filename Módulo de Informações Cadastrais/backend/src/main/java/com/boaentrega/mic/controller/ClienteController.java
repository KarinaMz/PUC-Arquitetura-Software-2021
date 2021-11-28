package com.boaentrega.mic.controller;

import com.boaentrega.mic.domain.entity.Cliente;
import com.boaentrega.mic.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping("/{id}")
    public Cliente getClienteById(@PathVariable(value = "id") Integer id){
        Optional<Cliente> clienteOptional = clienteRepository.findById(id);
        return clienteOptional.isPresent() ? clienteOptional.get() : null;
    }

    @GetMapping("/")
    public List<Cliente> getAllClientes() {
        return clienteRepository.getAll();
    }

}
