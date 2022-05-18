import { Order } from "../models/order";
import { OrderHistory } from "../models/order-history";

export interface ResponseOrderHistoryI {
    _embedded: {
        commandes: OrderHistory[];
    }
}
