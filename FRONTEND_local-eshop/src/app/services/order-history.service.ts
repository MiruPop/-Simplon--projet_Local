import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseOrderHistoryI } from '../interfaces/response-order-history-i';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl = "http://localhost:8080/api/commandes";

  constructor(private httpClient: HttpClient) { }

  getOrderHistory(theEmail:string): Observable<ResponseOrderHistoryI> {
    const orderHistoryUrl = `${this.orderUrl}/search/findByClientEmailOrderByDateCreationDesc?email=${theEmail}`;

    return this.httpClient.get<ResponseOrderHistoryI>(orderHistoryUrl);
  }
}
