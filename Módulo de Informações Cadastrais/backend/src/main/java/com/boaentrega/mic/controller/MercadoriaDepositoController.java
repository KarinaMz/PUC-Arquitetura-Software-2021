package com.boaentrega.mic.controller;

import com.boaentrega.mic.domain.entity.MercadoriaDeposito;
import com.boaentrega.mic.repository.MercadoriaDepositoRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mercadoriasDepositos")
public class MercadoriaDepositoController {

    private MercadoriaDepositoRepository mercadoriaDepositoRepository;

    @GetMapping("/")
    public List<MercadoriaDeposito> getAllMercadoriasDepositos(){
        return mercadoriaDepositoRepository.getAll();
    }

    @GetMapping("/cliente/{idCliente}")
    public List<MercadoriaDeposito> getAllByMercadoriaCliente(String idCliente){
        return mercadoriaDepositoRepository.getAllByMercadoriaCliente(idCliente);
    }
}
