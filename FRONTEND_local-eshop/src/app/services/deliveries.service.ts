import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseLivraisonI } from '../interfaces/response-livraison-i';
import { Delivery } from '../models/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveriesService {

  private url = environment.LOCAL_API_URL + '/livraisons';

  constructor(private httpClient: HttpClient) { }

  getDeliveryTypes(): Observable<Delivery[]> {
    return this.httpClient.get<ResponseLivraisonI>(this.url).pipe(
        map(response => response._embedded.livraisons)
      );
}
}
