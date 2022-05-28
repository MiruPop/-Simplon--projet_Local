package com.miru.local.repository;

import com.miru.local.configuration.DataSourceConfig;
import com.miru.local.entity.Artiste;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;

import static org.assertj.core.api.Assertions.assertThat;

import static com.miru.local.Fixtures.someArtist;

@ActiveProfiles("test")
@ContextConfiguration(classes = {DataSourceConfig.class})
@DataJpaTest
class ArtisteRepositoryTest {

    private Artiste artiste = someArtist();

    @Autowired
    ArtisteRepository artisteRepository;

    @BeforeEach
    void setUp() {
        artisteRepository.save(artiste);
    }

    @Test
    void findByNomContaining() {
    // GIVEN
        String keyword = "art";
    // WHEN
        Artiste expected = artisteRepository.findByNomContaining(keyword);
    // THEN
        assertThat(expected).usingRecursiveComparison().isEqualTo(artiste);
    }

    @Test
    void findByActiviteContaining() {
    // GIVEN
        String keyword = "art";
    // WHEN
        Artiste expected = artisteRepository.findByActiviteContaining(keyword);
    // THEN
        assertThat(expected).usingRecursiveComparison().ignoringFields("id").isEqualTo(artiste);
    }
}