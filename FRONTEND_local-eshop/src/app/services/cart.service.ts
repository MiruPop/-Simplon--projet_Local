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

  // Web Storage API
  // garder les infos du panier dans le stockage du navigateur:
  storage: Storage = sessionStorage;

  constructor() {
    // lire les données stockées
    let data = JSON.parse(this.storage.getItem('cartItems'));

    if (data != null) {
      this.cartItems = data;

      // calcul des valeurs totales en fonction des données stockées
      this.computeCartTotals();
    }

  }

  /***************************\
  * CRUD sur le shopping-cart *
  \***************************/
  // Ajout d'articles
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

  remove(myCartItem: CartItem) {
    // chercher l'index de l'article dans le tableau
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === myCartItem.id);

    // si article trouvé, supprimer du tableau à l'index donné
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }

  /*******************\
  * méthodes internes *
  \*******************/

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

    // persister les données du panier
    this.persistCartItems();
  }

   
  // Stockage du contenu du panier dans la session (clé/valeur)
  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

}
