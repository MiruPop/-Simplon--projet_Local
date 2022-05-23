import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { Location } from '@angular/common';
import { OktaAuthStateService } from '@okta/okta-angular';

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

  constructor(private oktaAuthService: OktaAuthStateService,
    private cartService: CartService,
    private location: Location) { }

  ngOnInit(): void {

    this.oktaAuthService.authState$.subscribe(
      result => {
        this.isAuthenticated = result.isAuthenticated;
      });

    this.listCartDetails();
  }

  listCartDetails() {
    // récupérer les articles du cart
    this.cartItems = this.cartService.cartItems;

    // souscrire au totalPrice
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

}
