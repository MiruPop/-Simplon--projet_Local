package com.miru.local.service;

import com.miru.local.dto.CommandeDto;
import com.miru.local.dto.InfoPaiement;
import com.miru.local.dto.ReponseCommande;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {
    ReponseCommande envoiCommande(CommandeDto achat);
    PaymentIntent creerPaymentIntent (InfoPaiement infoPaiement) throws StripeException;
}
