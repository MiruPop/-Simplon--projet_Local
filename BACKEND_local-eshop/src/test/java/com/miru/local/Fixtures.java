package com.miru.local;

import com.miru.local.dto.CommandeDto;
import com.miru.local.entity.*;

import java.util.HashSet;
import java.util.Set;

public class Fixtures {

    public static Client someClient() {
        return Client.builder()
                .id(Long.valueOf(1))
                .nom("DUPONT")
                .prenom("Toto")
                .email("totos@mail.com")
                .commandes(new HashSet<>())
                .build();
    }

    public static Artiste someArtist() {
        return Artiste.builder()
                .id(Long.valueOf(1))
                .nom("theartist")
                .activite("artistic activity")
                .build();
    }

    public static Categorie someCategory() {
        return Categorie.builder()
                .id(Long.valueOf(1))
                .libelle("category")
                .build();
    }

    /*******************  Building an order  *******************/

    public static Produit someProduct() {
        return Produit.builder()
                .id(Long.valueOf(1))
                .categorie(someCategory())
                .artiste(someArtist())
                .build();
    }
    public static Livraison someDeliveryType() {
        return Livraison.builder()
                .id(Long.valueOf(1))
                .type("test")
                .build();
    }

    public static Set<CommandeProduit> contentOfFirstOrder() {
        Set<CommandeProduit> orderLine = new HashSet<>();
        orderLine.add(CommandeProduit.builder()
                .id(Long.valueOf(1))
                .idProduit(someProduct().getId())
                .quantite(1)
                .prixUnitaire(10.00)
                .build());
        return orderLine;
    }
    public static Set<CommandeProduit> contentOfSecondOrder() {
        Set<CommandeProduit> orderLine = new HashSet<>();
        orderLine.add(CommandeProduit.builder()
                .id(Long.valueOf(2))
                .idProduit(someProduct().getId())
                .quantite(1)
                .prixUnitaire(10.00)
                .build());
        return orderLine;
    }

    public static Commande firstOrder() {
        return Commande.builder()
                .id(Long.valueOf(1))
                .commandeProduits(contentOfFirstOrder())
                .typeLivraison(someDeliveryType())
                .build();
    }
    public static Commande secondOrder() {
        return Commande.builder()
                .id(Long.valueOf(2))
                .commandeProduits(contentOfSecondOrder())
                .typeLivraison(someDeliveryType())
                .build();
    }

    public static CommandeDto commandeDto() {
        CommandeDto dto = new CommandeDto();
        dto.setClient(someClient());
        dto.setCommande(firstOrder());
        dto.setCommandeProduits(firstOrder().getCommandeProduits());

        return dto;
    }

}
