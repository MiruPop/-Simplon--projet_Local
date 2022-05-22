package com.miru.local.dto;

import lombok.Data;

@Data
public class InfoPaiement {
    /*
     montant = int, car Stripe utilise la plus petite valeur d'une devise
     ex : pour un prix de 1,99 eur, le montant est prix * 100 = 199 centimes
    */
    private int montant;
    private String devise;
}
