package com.miru.local.repository;

import com.miru.local.entity.Client;
import com.miru.local.entity.Commande;
import com.miru.local.entity.CommandeProduit;
import com.miru.local.entity.Livraison;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import static com.miru.local.Fixtures.*;
import static org.assertj.core.api.Assertions.assertThat;

@ActiveProfiles("test")
@DataJpaTest
@TestPropertySource(locations = "classpath:application-test.properties")
class CommandeRepositoryTest {

    private Livraison livraison = someDeliveryType();
    private CommandeProduit cp1 = contentOfFirstOrder().stream().findFirst().get();
    private CommandeProduit cp2 = contentOfSecondOrder().stream().findFirst().get();

    private Commande premiereCommande = firstOrder();
    private Commande deuxiemeCommande = secondOrder();
    private Client client = someClient();

    @Autowired
    ClientRepository clientRepository;
    @Autowired
    LivraisonRepository livraisonRepository;
    @Autowired
    CommandeProduitRepository commandeProduitRepository;
    @Autowired
    CommandeRepository commandeRepository;

    @BeforeEach
    void setUp() {

        livraisonRepository.save(livraison);
        commandeProduitRepository.save(cp1);
        commandeProduitRepository.save(cp2);
        this.premiereCommande.setClient(this.client);
        this.client.getCommandes().add(this.premiereCommande);
        clientRepository.save(client);
        this.deuxiemeCommande.setClient(this.client);
        this.client.getCommandes().add(this.deuxiemeCommande);
        clientRepository.save(client);
    }

    @AfterEach
    void tearDown() {
        clientRepository.deleteAll();
        clientRepository.flush();
        commandeRepository.deleteAll();
        commandeRepository.flush();
    }

    @Test
    void findByClientEmailOrderByDateCreationDesc_should_return_second_order_in_first_position() {
        // GIVEN
        String email = client.getEmail();

        // WHEN
        Page<Commande> expectedCommandes = this.commandeRepository
                .findByClientEmailOrderByDateCreationDesc(email, Pageable.ofSize(10));
        // THEN
        assertThat(expectedCommandes.getNumberOfElements())
                .isEqualTo(2);
        assertThat(expectedCommandes.toList().get(0).getId())
                .isEqualTo(deuxiemeCommande.getId());
    }

}