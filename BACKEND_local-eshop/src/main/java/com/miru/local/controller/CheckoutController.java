package com.miru.local.controller;

import com.miru.local.dto.CommandeDto;
import com.miru.local.dto.InfoPaiement;
import com.miru.local.dto.ReponseCommande;
import com.miru.local.service.CheckoutService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService service) {
        this.checkoutService = service;
    }

    @PostMapping("/payment-intent")
    public ResponseEntity<String> creerPaymentIntent (@RequestBody InfoPaiement infoPaiement) throws StripeException {
        PaymentIntent paymentIntent = checkoutService.creerPaymentIntent(infoPaiement);
        String paiement = paymentIntent.toJson();

        return new ResponseEntity<>(paiement, HttpStatus.OK);
    }

    @PostMapping("/achat")
    public ReponseCommande envoiCommande(@RequestBody CommandeDto commandeDto) {
        return checkoutService.envoiCommande(commandeDto);
    }
}
