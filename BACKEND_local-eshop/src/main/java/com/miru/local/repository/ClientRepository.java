package com.miru.local.repository;

import com.miru.local.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface ClientRepository extends JpaRepository<Client,Long> {
}
