package com.miru.local.repository;

import com.miru.local.entity.Client;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import static com.miru.local.Fixtures.someClient;
import static org.assertj.core.api.Assertions.assertThat;

@ActiveProfiles("test")
@DataJpaTest
@TestPropertySource(locations = "classpath:application-test.properties")
class ClientRepositoryTest {

    @Autowired
    private ClientRepository clientRepository;

    @Test
    void findClientByEmail_should_return_expected_client() {
        // GIVEN
        Client givenClient = someClient();
        String givenEmail = givenClient.getEmail();
        this.clientRepository.save(givenClient);

        // WHEN
        Client expectedClient = clientRepository.findClientByEmail(givenEmail);

        // THEN
        assertThat(expectedClient).usingRecursiveComparison()
                .ignoringFields("id")
                .isEqualTo(givenClient);
    }
}