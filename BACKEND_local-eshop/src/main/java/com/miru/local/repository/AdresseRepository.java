package com.miru.local.repository;

import com.miru.local.entity.Adresse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface AdresseRepository extends JpaRepository<Adresse,Long> {
}
