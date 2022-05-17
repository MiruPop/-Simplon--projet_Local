package com.miru.local.repository;

import com.miru.local.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client,Long> {

    Client findClientByEmail(String email);
}
