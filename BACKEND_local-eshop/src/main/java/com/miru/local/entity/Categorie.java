package com.miru.local.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "categorie")
//@Data - bug Lombok connu en utilisant cette annot. sur classe contenant relation @ManyToOne !!!
@Getter
@Setter
public class Categorie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "libelle")
    private String libelle;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "categorie")
    private Set<Produit> produits;
}
