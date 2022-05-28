package com.miru.local.repository;

import com.miru.local.entity.Artiste;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestParam;

@RepositoryRestResource
public interface ArtisteRepository extends JpaRepository<Artiste, Long> {

    // http://localhost:8080/api/artistes/search/findByNomContaining?nom={nom}
    Artiste findByNomContaining(@RequestParam("nom") String nom);

    // http://localhost:8080/api/artistes/search/findByActiviteContaining?activite={activite}
    Artiste findByActiviteContaining(@RequestParam("activite") String activite);
}
