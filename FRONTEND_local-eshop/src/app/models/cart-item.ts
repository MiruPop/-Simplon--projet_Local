import { Product } from "./product";

export class CartItem {
    id : number;
    libelle : string;
    caracteristiques : string;
    imageUrl : string;
    prixUnitaire : number;
    quantite : number;

    constructor(private product:Product) {
        this.id = product.id;
        this.libelle = product.libelle;
        this.caracteristiques = product.caracteristiques;
        this.imageUrl = product.imageUrl;
        this.prixUnitaire = product.prixUnitaire;

        this.quantite = 1;
    }
}
