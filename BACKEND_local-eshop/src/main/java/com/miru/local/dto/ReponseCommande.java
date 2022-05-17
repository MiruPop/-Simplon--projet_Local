package com.miru.local.dto;

import lombok.Data;
import lombok.NonNull;

@Data
public class ReponseCommande {
    // une fois la commande passée, un numéro de commande est généré et renvoyé à l'acheteur
    @NonNull
    private String numeroCommande;
}
