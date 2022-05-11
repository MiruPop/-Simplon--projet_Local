import { Address } from "../models/address";

export interface ResponseAdresseI {
    _embedded: {
        adresses: Address[];
    }
}
