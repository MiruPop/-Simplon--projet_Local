import { Customer } from "../models/customer";

export interface ResponseClientI {
    _embedded: {
        clients: Customer[];
    },
    page: {
      size: number,
      totalElements: number,
      totalPages: number,
      number: number
    }
}
