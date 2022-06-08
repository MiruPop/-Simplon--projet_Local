package com.miru.local.service;

import com.miru.local.dto.CommandeDto;
import com.miru.local.dto.ReponseCommande;
import com.miru.local.entity.Client;
import com.miru.local.entity.Produit;
import com.miru.local.repository.ClientRepository;
import com.miru.local.repository.ProduitRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import static com.miru.local.Fixtures.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

@ActiveProfiles("test")
@TestPropertySource(locations = "classpath:application-test.properties")
@ExtendWith(MockitoExtension.class)
class CheckoutServiceImplTest {
    private Produit produit = someProduct();
    private CommandeDto achat = commandeDto();
    @Value("${stripe.key.secret}")
    private String cleApiStripe;
    private Client client = someClient();

    @Mock
    private ProduitRepository produitRepository;
    @Mock
    private ClientRepository clientRepository;
    @InjectMocks
    private CheckoutService service = new CheckoutServiceImpl(clientRepository, cleApiStripe);

    @BeforeEach
    void setUp() {
        this.clientRepository.save(client);
        this.produitRepository.save(produit);
    }

    @Test
    void envoiCommande_should_return_expected_response() {
        // GIVEN
        String email = someClient().getEmail();
        given(this.clientRepository.findClientByEmail(email)).willReturn(this.client);
        given(this.produitRepository.getById(this.produit.getId())).willReturn(this.produit);

        // WHEN
        ReponseCommande expectedResponse = service.envoiCommande(commandeDto());
        String expectedOrderNumber = this.clientRepository.findClientByEmail(email)
                .getCommandes()
                .stream().findFirst().get()
                .getNumeroCommande();

        // THEN
        assertThat(expectedResponse.getNumeroCommande()).isNotNull();
        assertThat(expectedResponse.getNumeroCommande()).isEqualTo(expectedOrderNumber);
    }
}