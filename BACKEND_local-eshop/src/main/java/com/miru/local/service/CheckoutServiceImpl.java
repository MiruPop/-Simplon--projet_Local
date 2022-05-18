package com.miru.local.service;

import com.miru.local.dto.CommandeDto;
import com.miru.local.dto.ReponseCommande;
import com.miru.local.entity.Client;
import com.miru.local.entity.Commande;
import com.miru.local.entity.CommandeProduit;
import com.miru.local.repository.ClientRepository;
import com.miru.local.utils.StatutCommandeEnum;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

import static com.miru.local.utils.StatutCommandeEnum.TRAITEMENT;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private ClientRepository clientRepository;

    public CheckoutServiceImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    @Transactional
    public ReponseCommande envoiCommande(CommandeDto commandeDto) {

        Commande commande = commandeDto.getCommande();

        // générer un n° de commande unique et aléatoire
        String numeroCommande = genererNumeroCommande();
        commande.setNumeroCommande(numeroCommande);

        Set<CommandeProduit> produitsCommandes = commandeDto.getCommandeProduits();
        produitsCommandes.forEach(commande::add);

        commande.setAdresseFacturation(commandeDto.getAdresseFacturation());
        commande.setAdresseLivraison(commandeDto.getAdresseLivraison());
        commande.setStatut(StatutCommandeEnum.getStatutCommande(String.valueOf(TRAITEMENT)));

        // rattacher la commande au client
        Client client = commandeDto.getClient();
        Client existingClient = clientRepository.findClientByEmail(client.getEmail());

        if(existingClient != null) {
            client = existingClient;
        }

        client.add(commande);

        // sauvegarder le Client dans la BDD
            // la Cascade produira également la sauvegarde de la commande, des adresses
            // et des lignes de commande (CommandeProduit)
        clientRepository.save(client);

        return new ReponseCommande(numeroCommande);
    }

    private String genererNumeroCommande() {
        return UUID.randomUUID().toString();
    }
}
