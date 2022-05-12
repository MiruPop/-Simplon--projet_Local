import { CartItem } from "./cart-item";

export class OrderProduct {
    imageUrl : string;
    quantite : number;
    prixUnitaire : number;
    idProduit : number;

    constructor(cartItem : CartItem) {
        this.imageUrl = cartItem.imageUrl;
        this.quantite = cartItem.quantite;
        this.prixUnitaire = cartItem.prixUnitaire;
        this.idProduit = cartItem.id;
    }
}
