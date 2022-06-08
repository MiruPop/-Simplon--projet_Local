import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { Customer } from 'src/app/models/customer';

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
          const utilisateur = result;
          let myCustomer: Customer = new Customer;
          myCustomer.nom = result.family_name;
          myCustomer.prenom = result.given_name;
          myCustomer.email = result.email;
          // const prenomUtilisateur = result.given_name;
          // const nomUtilisateur = result.family_name;
          this.storage.setItem('clientEmail', JSON.stringify(emailUtilisateur));
          this.storage.setItem('customer', JSON.stringify(myCustomer));
          // this.storage.setItem('clientFirstName', JSON.stringify(prenomUtilisateur));
          // this.storage.setItem('clientLastName', JSON.stringify(nomUtilisateur));
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
