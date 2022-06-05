package com.miru.local.entity;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "commande_produit")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommandeProduit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name="image_url")
    private String imageUrl;
    @Column(name = "quantite")
    private int quantite;
    @Column(name="prix_unitaire")
    private Double prixUnitaire;
    @Column(name = "id_produit")
    private Long idProduit;

    @ManyToOne
    @JoinColumn(name = "id_commande")
    private Commande commande;
}
