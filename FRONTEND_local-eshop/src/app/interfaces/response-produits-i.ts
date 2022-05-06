import { Product } from "../models/product.model";

export interface ResponseProduitsI {
    _embedded: {
        produits: Product[];
    },
    page: {
      size: number,
      totalElements: number,
      totalPages: number,
      number: number
    }
}
