package com.miru.local.configuration;

import com.miru.local.entity.*;
import com.miru.local.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    // Classe de configuration du Spring Data REST pour :
        // - CORS mapping
        // - rendre certaines tables de la base de données Read-Only (sinon, Spring Boot
        // REST API expose librement les endpoints pour le CRUD)
        // - exposer les id des entités

    @Value("${allowed.origins}")
    private String[] allowedOrigins;

    private EntityManager entityManager;

    @Autowired
    public DataRestConfig (EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        // Personnaliser l'exposition des méthodes Http:
        // rendre la BDD Read-Only pour les tables exposées par Spring Data REST
        HttpMethod[] unsupportedMethods = {HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.PATCH};

        disableHttpMethods(Produit.class,config,unsupportedMethods);
        disableHttpMethods(Categorie.class,config,unsupportedMethods);
        disableHttpMethods(Artiste.class,config,unsupportedMethods);
        disableHttpMethods(Commande.class,config,unsupportedMethods);

        // exposer les identifiants des entités
        exposeIds(config);

        // configuration du cors mapping
        cors.addMapping(config.getBasePath() + "/**").allowedOrigins(allowedOrigins);
    }

    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] unsupportedMethods) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedMethods))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedMethods));
    }

    private void exposeIds(RepositoryRestConfiguration config) {

        // exposer les identifiants des entités

        // - obtenir liste de toutes les classes entity depuis l'entity manager
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

