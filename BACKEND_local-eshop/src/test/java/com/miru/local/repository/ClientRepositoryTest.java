package com.miru.local.repository;

import com.miru.local.configuration.DataSourceConfig;
import com.miru.local.entity.Client;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;

import static com.miru.local.Fixtures.someClient;
import static org.assertj.core.api.Assertions.assertThat;

@ActiveProfiles("test")
@ContextConfiguration(classes = {DataSourceConfig.class})
@DataJpaTest
class ClientRepositoryTest {

    private Client client = someClient();

    @Autowired
    private ClientRepository clientRepository;

    @BeforeEach
    void setUp() {
        clientRepository.save(client);
    }

    @Test
    void findClientByEmail_should_return_expected_client() {
        // GIVEN
        Client givenClient = someClient();
        String givenEmail = someClient().getEmail();

        // WHEN
        Client expectedClient = clientRepository.findClientByEmail(givenEmail);

        // THEN
        assertThat(expectedClient).usingRecursiveComparison()
                .isEqualTo(givenClient);
    }
}