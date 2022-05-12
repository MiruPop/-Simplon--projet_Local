import { Product } from "../models/product";

export interface ResponseProduitsArtistesI {
    _embedded: {
        produits: Product[];
    }
}
