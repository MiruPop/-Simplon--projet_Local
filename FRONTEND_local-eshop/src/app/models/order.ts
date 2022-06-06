import { Delivery } from "./delivery";

export class Order {
    quantiteTotale : number;
    prixTotal : number;
    statut: string;
    typeLivraison: Delivery;
}
