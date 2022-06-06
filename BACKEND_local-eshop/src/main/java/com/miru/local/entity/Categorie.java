package com.miru.local.entity;

import lombok.*;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "categorie")
//@Data - bug Lombok connu en utilisant cette annot. sur classe contenant relation @ManyToOne !!!
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Categorie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "libelle")
    private String libelle;

    @OneToMany(mappedBy = "categorie")
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Set<Produit> produits;
}
