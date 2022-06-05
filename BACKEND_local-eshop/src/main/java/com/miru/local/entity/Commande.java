package com.miru.local.entity;

import lombok.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "commandes")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
    private LocalDateTime dateCreation;
    @Column(name = "derniere_maj")
    @UpdateTimestamp
    private LocalDateTime derniereMaj;

    @OneToMany(mappedBy = "commande")
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    private Set<CommandeProduit> commandeProduits = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "id_client")
    private Client client;

    @OneToOne
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinColumn(name = "adresse_facturation_id", referencedColumnName = "id")
    private Adresse adresseFacturation;

    @OneToOne
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinColumn(name = "adresse_livraison_id", referencedColumnName = "id")
    private Adresse adresseLivraison;

    @ManyToOne
    @JoinColumn(name = "type_livraison", nullable = false)
    private Livraison typeLivraison;

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
