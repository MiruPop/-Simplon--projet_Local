import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseOrderHistoryI } from '../interfaces/response-order-history-i';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl = environment.LOCAL_API_URL + '/commandes';

  constructor(private httpClient: HttpClient) { }

  getOrderHistory(theEmail:string): Observable<ResponseOrderHistoryI> {
    const orderHistoryUrl = `${this.orderUrl}/search/findByClientEmailOrderByDateCreationDesc?email=${theEmail}`;

    return this.httpClient.get<ResponseOrderHistoryI>(orderHistoryUrl);
  }
}
