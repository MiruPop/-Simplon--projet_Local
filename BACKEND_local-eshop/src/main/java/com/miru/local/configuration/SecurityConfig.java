package com.miru.local.configuration;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // sécuriser l'endpoint /api/commandes
        http.authorizeRequests()
                .antMatchers("/api/commandes/**")
                .authenticated()
                .and()
                .oauth2ResourceServer()
                .jwt();

        // ajouter des filtres CORS
        http.cors();

        // ajouter une réponse en cas de requête non autorisée - fournie par Okta
        Okta.configureResourceServer401ResponseBody(http);
    }
}
