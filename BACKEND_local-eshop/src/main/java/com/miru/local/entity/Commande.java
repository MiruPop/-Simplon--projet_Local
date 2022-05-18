package com.miru.local.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "commandes")
@Getter
@Setter
public class Commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "numero_commande")
    private String numeroCommande;
    @Column(name = "prix_total")
    private Double prixTotal;
    @Column(name = "quantite_totale")
    private int quantiteTotale;
    @Column(name = "statut")
    private String statut;
    @Column(name = "date_creation")
    @CreationTimestamp
    private Date dateCreation;
    @Column(name = "derniere_maj")
    @UpdateTimestamp
    private Date derniereMaj;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "commande")
    private Set<CommandeProduit> commandeProduits = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "id_client")
    private Client client;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "adresse_facturation_id", referencedColumnName = "id")
    private Adresse adresseFacturation;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "adresse_livraison_id", referencedColumnName = "id")
    private Adresse adresseLivraison;

    public void add(CommandeProduit produitCommande) {
        if(produitCommande != null) {
            if(commandeProduits == null) {
                commandeProduits = new HashSet<>();
            }
            commandeProduits.add(produitCommande);
            produitCommande.setCommande(this);
        }
    }
}
