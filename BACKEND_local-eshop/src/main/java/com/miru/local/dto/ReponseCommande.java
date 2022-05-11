package com.miru.local.dto;

import lombok.Data;

@Data
public class ReponseCommande {
    // Lombok @Data génère des constructeurs uniquement pour les champs "final"
    // autre solution: annoter le champ avec @NonNull à la place de "final"
    private final String numeroCommande;
}
