package com.boaentrega.mic.controller;

import com.boaentrega.mic.domain.entity.Deposito;
import com.boaentrega.mic.repository.DepositoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/depositos")
public class DepositoController {

    @Autowired
    private DepositoRepository depositoRepository;

    @GetMapping("/")
    public List<Deposito> getAllDepositos() {
        return depositoRepository.getAll();
    }
}
