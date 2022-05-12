package com.miru.local.service;

import com.miru.local.dto.CommandeDto;
import com.miru.local.dto.ReponseCommande;

public interface CheckoutService {
    ReponseCommande envoiCommande(CommandeDto achat);
}
