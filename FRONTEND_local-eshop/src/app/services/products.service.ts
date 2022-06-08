import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { ResponseProduitsArtistesI } from "../interfaces/response-produits-artistes-i";
import { ResponseProduitsI } from "../interfaces/response-produits-i";
import { Product } from "../models/product";

@Injectable({
    providedIn: 'root'
  })
  export class ProductsService {

    private baseUrl = environment.LOCAL_API_URL
    private productUrl = environment.LOCAL_API_URL + '/produits';
      
    constructor(private httpClient: HttpClient) {}

      getProducts(): Observable<Product[]> {
          return this.httpClient.get<ResponseProduitsI>(this.productUrl).pipe(
            map(response => response._embedded.produits)
          );
      }

      getProductById(id:number) : Observable<Product> {
        const url = `${this.productUrl}/${id}`;
          return this.httpClient.get<Product>(url);
      }

      getProductsByArtist(artistId: number) : Observable<Product[]> {
        const artistProductUrl = `${this.baseUrl}/artistes/${artistId}/produits`
        return this.httpClient.get<ResponseProduitsArtistesI>(artistProductUrl).pipe(
          map(response => response._embedded.produits)
        )
      }

  }