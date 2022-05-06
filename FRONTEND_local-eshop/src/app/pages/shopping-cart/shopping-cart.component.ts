import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  paymentHandler:any = null;
 
  constructor() { }

  ngOnInit(): void {
    this.invokeStripe();
  }

  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JB4ssFGB2WlCAEvQSR7QsNaoGxQdDG8tPkXhVPcs4bHl8ZB7rOGcyWJvT6KdDoxiBCAk14QRldUHcnuJZVpPrbp00jXAmSbmJ',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log({stripeToken});
      }
    });

    paymentHandler.open({
      name: 'Marie DUPONT',
      description: 'Commande n° 123456',
      amount: amount * 100,
      modalClass: 'modal-dialog-centered'
    });
  }

  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51JB4ssFGB2WlCAEvQSR7QsNaoGxQdDG8tPkXhVPcs4bHl8ZB7rOGcyWJvT6KdDoxiBCAk14QRldUHcnuJZVpPrbp00jXAmSbmJ',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }

}
