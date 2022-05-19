package com.miru.local.configuration;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.authorizeRequests()
                .antMatchers("/api/commandes/**")
                .authenticated()
                .and()
                .oauth2ResourceServer()
                .jwt();

        // ajouter les filtres CORS
        http.cors();

        // afficher une reponse dans body pour les Erreurs 401
        Okta.configureResourceServer401ResponseBody(http);

        // désactiver CSRF pour pouvoir envoyer des requêtes POST
        // (car nous n'utilisons pas des Cookies de traçage de la Session)
        http.csrf().disable();
    }
}
