package com.miru.local.configuration;

import com.miru.local.entity.Artiste;
import com.miru.local.entity.Categorie;
import com.miru.local.entity.Produit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    // Cette classe est utilisée pour configurer Spring Data REST pour:
        // - rendre la base de données Read-Only (sinon, Spring Boot REST API expose librement les endpoints pour le CRUD)
        // - exposer les id des entités

    private EntityManager entityManager;

    // puisqu'il y a 1 seul constructeur, le @Autowired est ici optionnel
    @Autowired
    public DataRestConfig (EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }

    /* cette configuration personnalise l'exposition des méthodes Http par l'API REST
    Normalement, Spring Data Rest expose librement les endpoints pour le CRUD,
    mais pour éviter des actions utilisateurs non-désirées, on désactive les methodes
    d'écriture (POST, PUT, DELETE), et on laisse accéssible uniquement la lecture (GET) */

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        // configure cors mapping
//        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
//        cors.addMapping("/api/**").allowedOrigins("http://localhost:4200");
        // --
        HttpMethod[] unsupportedMethods = {HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE};

        // disable HTTP methods for Produit: PUT, POST, DELETE
        config.getExposureConfiguration()
                .forDomainType(Produit.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedMethods)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedMethods)));

        // disable HTTP methods for Categorie: PUT, POST, DELETE
        config.getExposureConfiguration()
                .forDomainType(Categorie.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedMethods)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedMethods)));

        // disable HTTP methods for Artiste: PUT, POST, DELETE
        config.getExposureConfiguration()
                .forDomainType(Artiste.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedMethods)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedMethods)));

        // méthode interne qui permet d'exposer les identifiants de entités
        exposeIds(config);
    }

    private void exposeIds(RepositoryRestConfiguration config) {

        // exposer les identifiants de entités

        // - obtenir liste de toutes les classes entity depuis le entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // - créer un tableau de types d'entités
        List<Class> entityClasses = new ArrayList<>();

        // - obtenir les types des entités existantes
        for (EntityType tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }

        // - exposer les id des entités pour le tableau des types d'entités/domaines
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}

