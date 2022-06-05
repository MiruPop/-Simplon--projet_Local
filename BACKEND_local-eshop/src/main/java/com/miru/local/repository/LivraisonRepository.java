package com.miru.local.repository;

import com.miru.local.entity.Livraison;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface LivraisonRepository extends JpaRepository<Livraison, Long> {
}
