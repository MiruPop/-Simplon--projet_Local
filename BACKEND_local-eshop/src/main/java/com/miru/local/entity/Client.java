package com.miru.local.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "client")
@Getter
@Setter
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "nom")
    private String nom;
    @Column(name = "prenom")
    private String prenom;
    @Column(name = "email")
    private String email;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "client")
    private Set<Commande> commandes = new HashSet<>();

    public void add(Commande commande) {
        if(commande != null) {
            if(commandes == null) {
                commandes = new HashSet<>();
            }
            commandes.add(commande);
            commande.setClient(this);
        }
    }
}
