package com.miru.local.service;

import com.miru.local.dto.CommandeDto;
import com.miru.local.dto.InfoPaiement;
import com.miru.local.dto.ReponseCommande;
import com.miru.local.entity.Client;
import com.miru.local.entity.Commande;
import com.miru.local.entity.CommandeProduit;
import com.miru.local.entity.Produit;
import com.miru.local.repository.ClientRepository;
import com.miru.local.repository.ProduitRepository;
import com.miru.local.utils.ModePaiementEnum;
import com.miru.local.utils.StatutCommandeEnum;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    private ProduitRepository produitRepository;

    private ClientRepository clientRepository;

    public CheckoutServiceImpl(ClientRepository clientRepository,
                               @Value("${stripe.key.secret}") String cleApiStripe) {
        this.clientRepository = clientRepository;
        Stripe.apiKey = cleApiStripe;
    }

    @Override
    @Transactional
    public ReponseCommande envoiCommande(CommandeDto commandeDto) {
        Commande commande = commandeDto.getCommande();

        // générer un n° de commande unique et aléatoire
        String numeroCommande = genererNumeroCommande();
        commande.setNumeroCommande(numeroCommande);

        List<CommandeProduit> produitsCommandes = commandeDto.getCommandeProduits();
        produitsCommandes.forEach(commande::add);
        commande.setAdresseFacturation(commandeDto.getAdresseFacturation());
        commande.setAdresseLivraison(commandeDto.getAdresseLivraison());
        commande.setTypeLivraison(commandeDto.getCommande().getTypeLivraison());
        commande.setStatut(String.valueOf(StatutCommandeEnum.TRAITEMENT));

        // rattacher la commande au client
        Client client = commandeDto.getClient();
        Client existingClient = clientRepository.findClientByEmail(client.getEmail());

        if(existingClient != null) {
            client = existingClient;
        }

        client.add(commande);

        clientRepository.save(client);
        for (CommandeProduit orderLine:produitsCommandes) {
            updateStock(orderLine.getIdProduit(), orderLine.getQuantite());
        }

        return new ReponseCommande(numeroCommande);
    }

    @Override
    public PaymentIntent creerPaymentIntent(InfoPaiement infoPaiement) throws StripeException {
        List<String> modesPaiement = new ArrayList<>();
        modesPaiement.add(String.valueOf(ModePaiementEnum.CARTE));

        Map<String,Object> params = new HashMap<>();
        params.put("amount", infoPaiement.getMontant());
        params.put("currency", infoPaiement.getDevise());
        params.put("payment_method_types", modesPaiement);
        params.put("description", "Achat boutique Lôcal");
        return PaymentIntent.create(params);
    }

    // méthode utilitaire
    private String genererNumeroCommande() {
        return UUID.randomUUID().toString();
    }


    private void updateStock(Long idProduit, int quantiteCommandee) {
        Produit produit = this.produitRepository.getById(idProduit);
        if(produit.getQuantiteStock() >= quantiteCommandee) {
            produit.setQuantiteStock(produit.getQuantiteStock() - quantiteCommandee);
        }
        else {
            produit.setQuantiteStock(0);
        }
        produitRepository.save(produit);
    }
}
