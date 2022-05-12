package com.miru.local.service;

import com.miru.local.dto.CommandeDto;
import com.miru.local.dto.ReponseCommande;
import com.miru.local.entity.Client;
import com.miru.local.entity.Commande;
import com.miru.local.entity.CommandeProduit;
import com.miru.local.repository.ClientRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private ClientRepository clientRepository;

    public CheckoutServiceImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    @Transactional
    public ReponseCommande envoiCommande(CommandeDto commandeDto) {
        // retirer les infos commande du DTO
        Commande commande = commandeDto.getCommande();

        // génerer le n° de commande
        String numeroCommande = genererNumeroCommande();
        commande.setNumero_commande(numeroCommande);

        // peupler la commande avec les produits commandés
        Set<CommandeProduit> produitsCommandes = commandeDto.getCommandeProduits();
        produitsCommandes.forEach(commande::add);

        // renseigner l'adresse de livraison et facturation
        commande.setAdresseFacturation(commandeDto.getAdresseFacturation());
        commande.setAdresseLivraison(commandeDto.getAdresseLivraison());

        // rattacher la commande au client
        Client client = commandeDto.getClient();
        client.add(commande);

        // sauvegarder dans la BDD
        clientRepository.save(client);

        // retourner la réponse
        return new ReponseCommande(numeroCommande);
    }

    private String genererNumeroCommande() {
        // générer un numéro UUID aléatoire
        return UUID.randomUUID().toString();
    }
}
