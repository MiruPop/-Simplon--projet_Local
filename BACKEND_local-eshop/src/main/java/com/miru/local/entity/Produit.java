package com.miru.local.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "produit")
@Data
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "libelle")
    private String libelle;
    @Column(name = "caracteristiques")
    private String caracteristiques;
    @Column(name = "description")
    private String description;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "prix_unitaire")
    private Double prixUnitaire;
    @Column(name = "quantite_stock")
    private int quantiteStock;
    @Column(name = "date_creation")
    @CreationTimestamp
    private Date dateCreation;
    @Column(name = "derniere_maj")
    @UpdateTimestamp
    private Date derniereMaj;

    @ManyToOne
    @JoinColumn(name = "id_categorie", nullable = false)
    private Categorie categorie;
    @ManyToOne
    @JoinColumn(name = "id_artiste", nullable = false)
    private Artiste artiste;

}
