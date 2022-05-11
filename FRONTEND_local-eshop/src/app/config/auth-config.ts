export default {

    oidc: {
        clientId:'0oa4zujxv6DCq9bS25d7',                            // identifiant public de l'app client
        issuer:'https://dev-38208603.okta.com/oauth2/default',      // issuer = générateur des tokens + URL pour l'autorisation avec Okta Authorisation Server
        redirectUri:'http://localhost:4200/login/callback',         // redirection des utilisateurs après authentification
        scopes:['openid', 'profile', 'email']                       // informations sur l'utilisateur
    }
}
