import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { ResponseProduitsArtistesI } from "../interfaces/response-produits-artistes-i";
import { ResponseProduitsI } from "../interfaces/response-produits-i";
import { Product } from "../models/product.model";

@Injectable({
    providedIn: 'root'
  })
  export class ProductsService {

    private baseUrl = 'http://localhost:8080/api'
    private productUrl = 'http://localhost:8080/api/produits';

    // products : Product[] = [
    //     {
    //       id : 1,
    //       title : "Jade",
    //       subtitle : "Cadre, 30x40 cm",
    //       description : "Realisé d’après une création de collage originale. Imprimé sur papier fine art william Turner en série limitée",
    //       category : "Décoration",
    //       artist : 1,
    //       price : 35.0,
    //       quantity : 3,
    //       imageURL : "https://i.postimg.cc/fbZ6PP0g/malo2.jpg",
    //     },
    //     {
    //       id : 2,
    //       title : "Dora",
    //       subtitle : "Badge, 56 mm",
    //       description : "Realisé d’après une création de collage originale.",
    //       category : "Bijoux",
    //       artist : 1,
    //       price : 4.0,
    //       quantity : 10,
    //       imageURL : "https://i.postimg.cc/RZwkXmqH/malo3.jpg"
    //     },
    //     {
    //       id : 3,
    //       title : "Smile",
    //       subtitle : "Housse de coussin, 45x45 cm",
    //       description : "Realisé d’après une création de collage originale. Imprimé sur cotton 100%.",
    //       category : "Décoration",
    //       artist : 1,
    //       price : 35.0,
    //       quantity : 10,
    //       imageURL : "https://i.postimg.cc/RFpyNVpj/malo4.jpg"
    //     },
    //     // {
    //     //   id : 4,
    //     //   title : "Angèle",
    //     //   subtitle : "Trousse, 21x14 cm",
    //     //   description : "Realisé d’après une création de collage originale. Imprimé sur cotton 100%.",
    //     //   category : "Divers",
    //     //   artist : 1,
    //     //   price : 19.0,
    //     //   quantity : 8,
    //     //   imageURL : "https://i.etsystatic.com/7711299/r/il/b79d0e/3385153005/il_794xN.3385153005_6qao.jpg"
    //     // },
    //     {
    //       id : 5,
    //       title : "Rouages",
    //       subtitle : "T-shirt, taille unique",
    //       description : "Sérigraphie sur textile, réalisé manuellement. Série limitée. Support cotton 100%",
    //       category : "Vêtements",
    //       artist : 2,
    //       price : 40.0,
    //       quantity : 10,
    //       imageURL : "https://i.postimg.cc/52WGHrpN/Unica1.jpg"
    //     },
    //     {
    //       id : 6,
    //       title : "Plantes en poche",
    //       subtitle : "Support vertical pour plantes",
    //       description : "Sérigraphie sur bâche, réalisé manuellement. Série limitée. Support bâche PVC de récupération",
    //       category : "Décoration",
    //       artist : 2,
    //       price : 70.0,
    //       quantity : 15,
    //       imageURL : "https://i.postimg.cc/BvqVp1dr/unica3.jpg"
    //     },
    //     {
    //       id : 7,
    //       title : "Scream",
    //       subtitle : "T-shirt, taille unique",
    //       description : "Sérigraphie sur textile, réalisé manuellement. Série limitée. Support cotton 100%",
    //       category : "Vêtements",
    //       artist : 2,
    //       price : 40.0,
    //       quantity : 10,
    //       imageURL : "https://i.postimg.cc/Jz3FjQd3/Unica2.jpg"
    //     }
    //   ];
      
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


      // je pourrais peut-être utiliser l'interface "ResponseProduitsI" ?
      getProductsByArtist(artistId: number) : Observable<Product[]> {
        const artistProductUrl = `${this.baseUrl}/artistes/${artistId}/produits`
        return this.httpClient.get<ResponseProduitsArtistesI>(artistProductUrl).pipe(
          map(response => response._embedded.produits)
        )
      }

  }