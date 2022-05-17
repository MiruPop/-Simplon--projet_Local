package com.miru.local.dto;

import com.miru.local.entity.Adresse;
import com.miru.local.entity.Client;
import com.miru.local.entity.Commande;
import com.miru.local.entity.CommandeProduit;
import lombok.Data;

import java.util.Set;

@Data
public class CommandeDto {

    // cette classe sert à mapper les différents éléments renseignés lors
    // d'une commande, à travers leurs classes-entité
    private Client client;
    private Adresse adresseLivraison;
    private Adresse adresseFacturation;
    private Commande commande;
    private Set<CommandeProduit> commandeProduits;

}
