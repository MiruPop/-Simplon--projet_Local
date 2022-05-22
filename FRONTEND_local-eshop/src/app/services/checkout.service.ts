import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentInfo } from '../models/payment-info';
import { Purchase } from '../models/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = environment.LOCAL_API_URL + '/checkout/achat';
  private paymentIntentUrl = environment.LOCAL_API_URL + '/checkout/payment-intent';

  constructor(private httpClient : HttpClient) { }

  createPaymentIntent(paymentInfo : PaymentInfo) : Observable<any> {
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
  }

  placeOrder(purchase : Purchase) : Observable<any> {
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }
}
