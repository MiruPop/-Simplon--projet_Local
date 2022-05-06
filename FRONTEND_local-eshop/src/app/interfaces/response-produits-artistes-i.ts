import { Product } from "../models/product.model";

export interface ResponseProduitsArtistesI {
    _embedded: {
        produits: Product[];
    }
}
