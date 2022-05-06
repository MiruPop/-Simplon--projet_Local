package com.miru.local.repository;

import com.miru.local.entity.Artiste;
import com.miru.local.entity.Produit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:4200")
public interface ArtisteRepository extends JpaRepository<Artiste, Long> {

    // http://localhost:8080/api/artistes/search/findByNomContaining?nom={nom}
    Page<Artiste> findByNomContaining(@RequestParam("nom") String nom, Pageable pageable);

    // http://localhost:8080/api/artistes/search/findByActiviteContaining?activite={activite}
    Page<Artiste> findByActiviteContaining(@RequestParam("activite") String activite, Pageable pageable);
}
