package com.miru.local.repository;

import com.miru.local.entity.Artiste;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import static com.miru.local.Fixtures.someArtist;
import static org.assertj.core.api.Assertions.assertThat;

@ActiveProfiles("test")
@DataJpaTest
@TestPropertySource(locations = "classpath:application-test.properties")
class ArtisteRepositoryTest {
    private Artiste artiste = someArtist();

    @Autowired
    ArtisteRepository artisteRepository;

    @BeforeEach
    void setUp() {
        artisteRepository.save(artiste);
    }

    @Test
    void findByNomContaining_shoud_return_expected_artist() {
    // GIVEN
        String keyword = "art";
    // WHEN
        Artiste expected = artisteRepository.findByNomContaining(keyword);
    // THEN
        assertThat(expected).usingRecursiveComparison()
                .ignoringFields("id")
                .isEqualTo(artiste);
    }

    @Test
    void findByActiviteContaining_shoud_return_expected_artist() {
    // GIVEN
        String keyword = "art";
    // WHEN
        Artiste expected = artisteRepository.findByActiviteContaining(keyword);
    // THEN
        assertThat(expected).usingRecursiveComparison().ignoringFields("id").isEqualTo(artiste);
    }
}