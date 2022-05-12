import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderProduct } from 'src/app/models/order-product';
import { Purchase } from 'src/app/models/purchase';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FormService } from 'src/app/services/form.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  constructor(private formBuilder: FormBuilder,
    private formService: FormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router) { }

  ngOnInit(): void {
    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        prenom: new FormControl('', [Validators.required, Validators.minLength(2),
        CustomValidators.notOnlyWhitespace]),
        nom: new FormControl('', [Validators.required, Validators.minLength(2),
        CustomValidators.notOnlyWhitespace]),
        email: new FormControl('', [Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
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
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2),
        CustomValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required,
        Validators.pattern('[0-9]{16}')]),
        expirationMonth: [''],
        expirationYear: [''],
        securityCode: new FormControl('', [Validators.required,
        Validators.pattern('[0-9]{3}')]),
      }),
    });

    // peupler les mois/années de la carte de crédit
    this.fillCcMonths();
    this.fillCcYears();

  }

  // getters pour les Form Controls
  get prenom() { return this.checkoutFormGroup.get('customer.prenom'); }
  get nom() { return this.checkoutFormGroup.get('customer.nom'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  get rueLivraison() { return this.checkoutFormGroup.get('adresseLivraison.rue'); }
  get villeLivraison() { return this.checkoutFormGroup.get('adresseLivraison.ville'); }
  get codePostalLivraison() { return this.checkoutFormGroup.get('adresseLivraison.codePostal'); }
  get paysLivraison() { return this.checkoutFormGroup.get('adresseLivraison.pays'); }

  get rueFacturation() { return this.checkoutFormGroup.get('adresseFacturation.rue'); }
  get villeFacturation() { return this.checkoutFormGroup.get('adresseFacturation.ville'); }
  get codePostalFacturation() { return this.checkoutFormGroup.get('adresseFacturation.codePostal'); }
  get paysFacturation() { return this.checkoutFormGroup.get('adresseFacturation.pays'); }

  get cardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get cardName() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get cardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get cardCcv() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

  // souscrire aux dernières valeurs totales calculés par le cartService
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

  // pré-remplissage mois / années dans "expiration carte crédit"
  fillCcMonths() {
    const startMonth: number = new Date().getMonth() + 1;
    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )
  }
  fillCcYears() {
    this.formService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    )
  }
  // si l'année séléctionnée = année courante => commencer avec le mois courant
  // sinon, commencer avec le 1er mois
  handleMonthsYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );
  }

  // checkbox pour remplir l'adresse de facturation avec les mêmes données que l'adresse de livraison
  copyShippingToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.adresseFacturation
        .setValue(this.checkoutFormGroup.controls.adresseLivraison.value);
    }
    else {
      this.checkoutFormGroup.controls.adresseFacturation.reset();
    }
  }

  // soumettre le formulaire de commande et vérifier la validation
  onSubmit() {

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // mettre en place la commande
    let order = new Order();
    order.prixTotal = this.totalPrice;
    order.prixTotal = this.totalQuantity;

    // récupérer les articles du cart
    const cartItems = this.cartService.cartItems;

    // - méthode pour remplacer une boucle "for" pour remplir les orderItems depuis les cartItems
    let orderProducts: OrderProduct[] = cartItems.map(elem => new OrderProduct(elem));

    // créer un achat et peupler ses champs depuis le formulaire:
    let purchase = new Purchase();

    /* client */
    purchase.client = this.checkoutFormGroup.controls['customer'].value;

    /* adresses livraison et facturation */
    purchase.adresseLivraison = this.checkoutFormGroup.controls['adresseLivraison'].value;
    purchase.adresseFacturation = this.checkoutFormGroup.controls['adresseFacturation'].value;

    /* commande et produits commandés */
    purchase.commande = order;
    purchase.commandeProduits = orderProducts;

    // appel REST Api via le CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe(
      {
        // success path
        next : response => {
          alert(`Votre commande a été envoyée.\nNuméro de commande: ${response.numeroCommande}`);
          
          this.resetCart();
        },
        // error/exception path
        error : erreur => {
          alert(`Erreur: ${erreur.message}`);
        }
      }
    );

  }
  resetCart() {
    // supprimer infos shopping cart
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    //supprimer infos formulaire
    this.checkoutFormGroup.reset();

    //naviguer sur la page des produits
    this.router.navigateByUrl('/home')
  }

}
