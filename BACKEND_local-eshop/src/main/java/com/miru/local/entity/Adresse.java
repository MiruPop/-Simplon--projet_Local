package com.miru.local.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "adresse")
@Getter
@Setter
public class Adresse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "rue")
    private String rue;
    @Column(name = "ville")
    private String ville;
    @Column(name = "code_postal")
    private String codePostal;
    @Column(name = "pays")
    private String pays;

    @OneToOne
    // jointure par les clés primaires - par default, les clés ont le même nom
    @PrimaryKeyJoinColumn
    private Commande commande;
}
