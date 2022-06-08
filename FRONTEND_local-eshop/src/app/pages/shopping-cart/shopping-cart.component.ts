import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { Location } from '@angular/common';
import { OktaAuthStateService } from '@okta/okta-angular';
import { Delivery } from 'src/app/models/delivery';
import { DeliveriesService } from 'src/app/services/deliveries.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  isAuthenticated: boolean;

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  buttonText: string;

  selectedDelivery: Delivery = new Delivery();
  deliveryModes: Delivery[] = [];

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthStateService,
    private cartService: CartService,
    private deliveryService: DeliveriesService,
    private location: Location) { }

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe(
      result => {
        this.isAuthenticated = result.isAuthenticated;
      });

    this.buttonText = 'Choisissez la livraison'
    this.getDeliveryModes();

    this.listCartDetails();
  }


  getDeliveryModes() {

    this.deliveryService.getDeliveryTypes().subscribe(
      data => {
        this.deliveryModes = data
      });
  }

  listCartDetails() {
    // récupérer les articles du cart
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // souscrire au totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    // calculer le prix et la quantité totaux
    this.cartService.computeCartTotals();
  }


  incrementQuantity(myCartItem: CartItem) {
    this.cartService.addToCart(myCartItem);
  }
  decrementQuantity(myCartItem: CartItem) {
    this.cartService.decrementQuantity(myCartItem);
  }
  remove(myCartItem: CartItem) {
    this.cartService.remove(myCartItem);
  }

  goBack(): void {
    this.location.back();
  }

  onChange() {
    this.buttonText = "Passer commande";
    this.storage.setItem('delivery', JSON.stringify(this.selectedDelivery));
    console.log(this.selectedDelivery);
  }

}
