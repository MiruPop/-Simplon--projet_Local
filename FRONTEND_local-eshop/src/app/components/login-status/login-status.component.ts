import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.scss']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean;
  userFirstName: string;

  storage: Storage = sessionStorage;

  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(private oktaAuthService: OktaAuthStateService,
              @Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
              private modalService: MdbModalService) { }

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

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: { title: 'Custom title',
      buttonAction:'Custom buttonAction',
      bottomText:'custom text',
      choiceText:'change action' },
      modalClass: 'modal-dialog-centered'
    });
    this.modalRef.onClose.subscribe((message: any) => {
      console.log(message);
    });
  }

  logout() {
    // terminer la session courante et détruire les tokens
    this.oktaAuth.signOut();
  }

}
