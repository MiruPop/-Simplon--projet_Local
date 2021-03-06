import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Delivery } from 'src/app/models/delivery';
import { Order } from 'src/app/models/order';
import { OrderProduct } from 'src/app/models/order-product';
import { PaymentInfo } from 'src/app/models/payment-info';
import { Purchase } from 'src/app/models/purchase';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CustomValidators } from 'src/app/validators/custom-validators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  storage: Storage = sessionStorage;
  delivery: Delivery = JSON.parse(this.storage.getItem('delivery'));
  customer: Customer;

  // let emailUtilisateur: string;
  // let prenomUtilisateur: string;
  // let nomUtilisateur: string;


  // initialisation de l'API STripe
  stripe = Stripe(environment.STRIPE_PUBLIC_KEY);
  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = "";

  isDisabled: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router) { }

  ngOnInit(): void {

    this.setupStripePaymentForm();
    this.reviewCartDetails();

    this.customer = JSON.parse(this.storage.getItem('customer'));

    this.checkoutFormGroup = this.formBuilder.group({

      adresseLivraison: this.formBuilder.group({
        rue: new FormControl('', [Validators.required, Validators.minLength(2),
        CustomValidators.notOnlyWhitespace]),
        ville: new FormControl('', [Validators.required, Validators.minLength(2),
        CustomValidators.notOnlyWhitespace]),
        codePostal: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}$')]),
        pays: new FormControl('', [Validators.required, Validators.minLength(2),
        CustomValidators.notOnlyWhitespace])
      }),
      adresseFacturation: this.formBuilder.group({
        rue: new FormControl('', [Validators.required, Validators.minLength(2),
        CustomValidators.notOnlyWhitespace]),
        ville: new FormControl('', [Validators.required, Validators.minLength(2),
        CustomValidators.notOnlyWhitespace]),
        codePostal: new FormControl('', [Validators.required,
        Validators.pattern('[0-9]{5}')]),
        pays: new FormControl('', [Validators.required, Validators.minLength(2),
        CustomValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
      }),
    });

  }

  // getters pour les Form Controls
  get rueLivraison() { return this.checkoutFormGroup.get('adresseLivraison.rue'); }
  get villeLivraison() { return this.checkoutFormGroup.get('adresseLivraison.ville'); }
  get codePostalLivraison() { return this.checkoutFormGroup.get('adresseLivraison.codePostal'); }
  get paysLivraison() { return this.checkoutFormGroup.get('adresseLivraison.pays'); }

  get rueFacturation() { return this.checkoutFormGroup.get('adresseFacturation.rue'); }
  get villeFacturation() { return this.checkoutFormGroup.get('adresseFacturation.ville'); }
  get codePostalFacturation() { return this.checkoutFormGroup.get('adresseFacturation.codePostal'); }
  get paysFacturation() { return this.checkoutFormGroup.get('adresseFacturation.pays'); }


  // charger le formulaire de paiement Stripe
  setupStripePaymentForm() {

    var elements = this.stripe.elements();

    // cr??er un ??l??ment "carte", le personnaliser en cachant le champ "postal-code",
    // car celui-ci est collect?? dans le champ 'adresse'
    // this.cardElement = elements.create('card', {hidePostalCode: true});
    this.cardElement = elements.create('card', {
      hidePostalCode: true,
      style: {
        base: {
          lineHeight: '3em',
          fontWeight: '300',
          fontSize: '16px',
          '::placeholder': {
            color: '#2C73CD'
          }
        }
      }
    });

    // injecter une instance de l'??l??ment dans la <div> 'card-element'
    this.cardElement.mount('#card-element')

    // event binding pour les event='change' (VALIDATION) dans le composant de paiement
    this.cardElement.on('change', (event) => {
      // r??cup??rer l'??l??ment d'affichage des erreurs
      this.displayError = document.getElementById('card-errors');

      if (event.complete) {
        this.displayError.textContent = "";
      }
      else if (event.error) {
        this.displayError.textContent = event.error.message;
      }
    })

  }

  // souscrire aux derni??res valeurs totales calcul??s par le cartService
  reviewCartDetails() {
    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data
      });
    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data
      });
  }

  // checkbox pour remplir l'adresse de facturation avec les m??mes donn??es que l'adresse de livraison
  copyShippingToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.adresseFacturation
        .setValue(this.checkoutFormGroup.controls.adresseLivraison.value);
    }
    else {
      this.checkoutFormGroup.controls.adresseFacturation.reset();
    }
  }

  // soumettre le formulaire de commande et v??rifier la validation
  onSubmit() {

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // mettre en place la commande
    let order = new Order();
    order.prixTotal = this.totalPrice + this.delivery.prix;
    order.typeLivraison = this.delivery;
    order.quantiteTotale = this.totalQuantity;
    console.log(order)
    console.log(order.typeLivraison.type)

    // r??cup??rer les articles du cart
    const cartItems = this.cartService.cartItems;

    // - m??thode pour remplacer une boucle "for" pour remplir les orderItems depuis les cartItems
    let orderProducts: OrderProduct[] = cartItems.map(elem => new OrderProduct(elem));


    // cr??er un achat et peupler ses champs depuis le formulaire:
    let purchase = new Purchase();

    /* client */
    // purchase.client = this.checkoutFormGroup.controls['customer'].value;
    purchase.client = this.customer;

    /* adresses livraison et facturation */
    purchase.adresseLivraison = this.checkoutFormGroup.controls['adresseLivraison'].value;
    purchase.adresseFacturation = this.checkoutFormGroup.controls['adresseFacturation'].value;

    /* commande et produits command??s */
    purchase.commande = order;
    purchase.commandeProduits = orderProducts;

    // calculer la somme totale en centimes (impos?? par le fonctionnement Stripe)
    this.paymentInfo.montant = Math.round(this.totalPrice * 100);
    this.paymentInfo.devise = "EUR";

    // si le formulaire est valid??, cr??er l'objet paymentIntent,
    // confirmer le paiement par carte et envoyer la commande
    if (!this.checkoutFormGroup.invalid && this.displayError.textContent === "") {
      this.isDisabled = true;

      this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe(
        (paymentIntentResponse) => {
          // les donn??es sont envoy??es directement sur les serveurs Stripe
          // https://stripe.com/docs/js/payment_intents/payment_method
          this.stripe.confirmCardPayment(paymentIntentResponse.client_secret,
            {
              payment_method: {
                card: this.cardElement,
                billing_details: {
                  email: purchase.client.email,
                  name: `${purchase.client.prenom} ${purchase.client.nom}`,
                  address: {
                    line1: purchase.adresseFacturation.rue,
                    city: purchase.adresseFacturation.ville,
                    postal_code: purchase.adresseFacturation.codePostal,
                    country: purchase.adresseFacturation.pays
                  }
                }
              },
            },
            {
              handleActions: false
            })
            .then(function (result) {
              // valider l'envoi des informations de paiement
              if (result.error) {
                alert(`Une erreur s'est produite : ${result.error.message}`);
                this.isDisabled = false;
              }
              else {
                // appel API via le CheckoutService
                this.checkoutService.placeOrder(purchase).subscribe({
                  // valider l'envoi de la commande
                  next: response => {
                    alert(`Votre commande a ??t?? envoy??e.\nNum??ro de commande: ${response.numeroCommande}`)
                    this.resetCart();
                    this.isDisabled = false;
                  },
                  error: err => {
                    alert(`Une erreur s'est produite : ${err.message}`);
                    this.isDisabled = false;
                  }
                });
              }
            }.bind(this));
        });
    }
    else {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

  }

  resetCart() {
    // supprimer infos shopping cart
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    //m??j le storage avec le dernier ??tat du cart = vides
    this.cartService.persistCartItems();

    //supprimer infos formulaire
    this.checkoutFormGroup.reset();

    //naviguer sur la page des produits
    this.router.navigateByUrl('/home')
  }

}
