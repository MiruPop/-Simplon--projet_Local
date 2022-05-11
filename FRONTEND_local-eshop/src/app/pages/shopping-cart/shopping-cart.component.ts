import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  // paymentHandler:any = null;
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
 
  constructor(private cartService: CartService,
    private location:Location) { }

  ngOnInit(): void {
    this.listCartDetails();
    // this.invokeStripe();
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

  
  incrementQuantity(myCartItem:CartItem) {
    this.cartService.addToCart(myCartItem);
  }
  decrementQuantity(myCartItem:CartItem) {
    this.cartService.decrementQuantity(myCartItem);
  }
  remove(myCartItem:CartItem) {
    this.cartService.remove(myCartItem);
  }
  
  goBack():void {
    this.location.back();
  }

  // initializePayment(amount: number) {
  //   const paymentHandler = (<any>window).StripeCheckout.configure({
  //     key: 'pk_test_51JB4ssFGB2WlCAEvQSR7QsNaoGxQdDG8tPkXhVPcs4bHl8ZB7rOGcyWJvT6KdDoxiBCAk14QRldUHcnuJZVpPrbp00jXAmSbmJ',
  //     locale: 'auto',
  //     token: function (stripeToken: any) {
  //       console.log({stripeToken});
  //     }
  //   });

  //   paymentHandler.open({
  //     name: 'Marie DUPONT',
  //     description: 'Commande n° 123456',
  //     amount: amount * 100,
  //     modalClass: 'modal-dialog-centered'
  //   });
  // }

  // invokeStripe() {
  //   if(!window.document.getElementById('stripe-script')) {
  //     const script = window.document.createElement("script");
  //     script.id = "stripe-script";
  //     script.type = "text/javascript";
  //     script.src = "https://checkout.stripe.com/checkout.js";
  //     script.onload = () => {
  //       this.paymentHandler = (<any>window).StripeCheckout.configure({
  //         key: 'pk_test_51JB4ssFGB2WlCAEvQSR7QsNaoGxQdDG8tPkXhVPcs4bHl8ZB7rOGcyWJvT6KdDoxiBCAk14QRldUHcnuJZVpPrbp00jXAmSbmJ',
  //         locale: 'auto',
  //         token: function (stripeToken: any) {
  //           console.log(stripeToken)
  //         }
  //       });
  //     }
  //     window.document.body.appendChild(script);
  //   }
  // }

}
