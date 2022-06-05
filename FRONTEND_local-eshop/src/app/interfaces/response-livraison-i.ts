import { Delivery } from "../models/delivery";

export interface ResponseLivraisonI {
    _embedded: {
        livraisons: Delivery[];
    }
}
