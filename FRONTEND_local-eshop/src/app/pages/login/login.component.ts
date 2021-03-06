import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';

import authConfig from 'src/app/config/auth-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  oktaSignin: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignin = new OktaSignIn({
      logo: 'https://i.postimg.cc/J4HVHZLK/local-logo.jpg',
      baseUrl: authConfig.oidc.issuer.split('/oauth2')[0],
      clientId: authConfig.oidc.clientId,
      redirectUri: authConfig.oidc.redirectUri,
      colors: {
        brand: '#000000'
      },
      i18n: {
        fr: {
          'primaryauth.title': 'Connectez-vous à votre Lôcal !',
          'primaryauth.username.placeholder': 'Adresse e-mail',
          'primaryauth.username.tooltip': 'Renseigner votre adresse mail',
          'error.username.required': 'Veuillez renseigner l\'adresse mail',
          'country.FR': 'France, edited'
        }
      },
      logoText: 'lôcal boutique',
      features: {
        registration: true,
        showPasswordToggleOnSignInPage: true
      },
      authParams: {
        pkce: true,
        issuer: authConfig.oidc.issuer,
        scopes: authConfig.oidc.scopes
      },
      registration: {
        click: () => {
          window.location.href = 'https://localhost:4200/sign-up';
        }
      }
      });
  }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl(
      {
        el: '#widget-container'   // #id de la <div> contenant le widget
      },
      (response: any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      });
  }

}
