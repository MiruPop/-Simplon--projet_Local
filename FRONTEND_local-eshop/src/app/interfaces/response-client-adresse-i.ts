import { Address } from "../models/address";

export interface ResponseClientAdresseI {
    _embedded: {
        adresses: Address[];
    }
}
