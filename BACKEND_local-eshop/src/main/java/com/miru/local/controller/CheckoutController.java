package com.miru.local.controller;

import com.miru.local.dto.CommandeDto;
import com.miru.local.dto.ReponseCommande;
import com.miru.local.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService service) {
        this.checkoutService = service;
    }

    @PostMapping("/achat")
    public ReponseCommande envoiCommande(@RequestBody CommandeDto commandeDto) {
        return checkoutService.envoiCommande(commandeDto);
    }
}
