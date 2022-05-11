import { Address } from "./address";
import { Customer } from "./customer";
import { Order } from "./order";
import { OrderProduct } from "./order-product";

export class Purchase {
    [x: string]: any;
    client : Customer;
    adresseFacturation : Address;
    adresseLivraison : Address;
    commande : Order;
    commandeProduits : OrderProduct[];
}
