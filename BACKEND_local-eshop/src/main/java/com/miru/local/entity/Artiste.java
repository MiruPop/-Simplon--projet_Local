package com.miru.local.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "artiste")
@Getter
@Setter
public class Artiste {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "nom")
    private String nom;
    @Column(name = "activite")
    private String activite;
    @Column(name = "description")
    private String description;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "email")
    private String email;
    @Column(name = "weblink")
    private String webLink;
    @Column(name = "facebook")
    private String facebookLink;
    @Column(name = "instagram")
    private String instagramLink;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "artiste")
    private Set<Produit> produits;

}
