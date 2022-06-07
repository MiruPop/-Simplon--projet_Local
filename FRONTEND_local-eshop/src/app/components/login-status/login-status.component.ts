import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.scss']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean;
  userFirstName: string;

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthStateService,
              @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  ngOnInit(): void {
    // souscrire aux changements de l'état d'authentification
    this.oktaAuthService.authState$.subscribe(
      result => {
        this.isAuthenticated = result.isAuthenticated;
        this.getUserDetails();
      }
    )
  }


  getUserDetails() {
    if(this.isAuthenticated) {
      // récupérer les détails utilisateur (voir config-scopes="user claims")
      this.oktaAuth.getUser().then(
        result => {

          this.userFirstName = result.given_name;

          const emailUtilisateur = result.email;
          this.storage.setItem('clientEmail', JSON.stringify(emailUtilisateur));
        }
      )
    }
  }

  logout() {
    // terminer la session courante et détruire les tokens
    this.oktaAuth.signOut();
    // nettoyer le stockage de la Session
    this.storage.clear();
  }

}
