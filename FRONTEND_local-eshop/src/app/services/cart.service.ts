import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0); // 0 = valeur initiale
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(myCartItem: CartItem) {
    // vérifier si l'élément existe déjà dans le panier
    let alreadyInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    // trouver l'élément du panier par son id / ou undefined si rien trouvé
    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === myCartItem.id)
      alreadyInCart = (existingCartItem != undefined);
    }

    if (alreadyInCart) {
      // incrémenter la quantité
      existingCartItem.quantite++;
    }
    else {
      // ajouter au tableau
      this.cartItems.push(myCartItem);
    }

    // calculer le prix total et la quantité dans le cart
    this.computeCartTotals();
  }

  decrementQuantity(myCartItem: CartItem) {
    myCartItem.quantite--;

    if (myCartItem.quantite === 0) {
      this.remove(myCartItem);
    }
    else {
      this.computeCartTotals();
    }
  }

  // méthodes internes
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantite * currentCartItem.prixUnitaire;
      totalQuantityValue += currentCartItem.quantite;
    }

    // publier les valeurs actualisées pour les Subscribers
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  remove(myCartItem: CartItem) {
    // chercher l'index de l'article dans le tableau
    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === myCartItem.id );

    // si article trouvé, supprimer du tableau à l'index donné
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }

  }
}
