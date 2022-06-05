package com.miru.local.repository;

import com.miru.local.entity.CommandeProduit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeProduitRepository extends JpaRepository<CommandeProduit,Long> {
}
