package com.miru.local.dto;

import com.miru.local.entity.Adresse;
import com.miru.local.entity.Client;
import com.miru.local.entity.Commande;
import com.miru.local.entity.CommandeProduit;
import lombok.Data;

import java.util.List;

@Data
public class CommandeDto {
    private Client client;
    private Adresse adresseLivraison;
    private Adresse adresseFacturation;
    private Commande commande;
    private List<CommandeProduit> commandeProduits;
}
