package com.miru.local;

import com.miru.local.entity.Artiste;
import com.miru.local.entity.Categorie;
import com.miru.local.entity.Client;
import com.miru.local.entity.Produit;

import java.util.HashSet;
import java.util.Set;

public class Fixtures {

//    public static Produit firstProduct() {
//        return Produit.builder()
//                .id(Long.valueOf(1))
//                .categorie(someCategory())
//                .artiste(someArtist())
//                .build();
//    }
//    public static Produit secondProduct() {
//        return Produit.builder()
//                .id(Long.valueOf(2))
//                .categorie(someCategory())
//                .artiste(someArtist())
//                .build();
//    }

    public static Client someClient() {
        return Client.builder()
                .id(Long.valueOf(1))
                .nom("DUPONT")
                .prenom("Toto")
                .email("totos@mail.com")
                .commandes(new HashSet<>())
                .build();
    }

//    public static Set<Produit> getProducts() {
//        Set<Produit> products = new HashSet<>();
//        products.add(firstProduct());
//        products.add(secondProduct());
//
//        return products;
//    }
//
//
//    public static Categorie someCategory() {
//        return Categorie.builder()
//                .id(Long.valueOf(1))
//                .libelle("category")
//                .build();
//    }
//
    public static Artiste someArtist() {
        return Artiste.builder()
                .id(Long.valueOf(1))
                .nom("thearttist")
                .activite("artistic activity")
                .build();
    }

}
