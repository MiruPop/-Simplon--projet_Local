package com.miru.local.repository;

import com.miru.local.entity.Produit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:4200")
public interface ProduitRepository extends JpaRepository<Produit, Long> {
    // http://localhost:8080/api/produits/search/findByCategorieId?id={id}
    Page<Produit> findByCategorieId(@RequestParam("id") Long id, Pageable pageable);

    // http://localhost:8080/api/produits/search/findByArtisteId?id={id}
    Page<Produit> findByArtisteId(@RequestParam("id") Long id, Pageable pageable);

    // http://localhost:8080/api/produits/search/findByCaracteristiquesContaining?texte={texte}
    Page<Produit> findByCaracteristiquesContaining(@RequestParam("texte") String texte, Pageable pageable);
}
