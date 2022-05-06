import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs/internal/Observable";
import { ResponseArtistesI } from '../interfaces/response-artistes-i';
import { Artist } from "../models/artist.model";

@Injectable({
    providedIn: 'root'
})
export class ArtistsService {

    private artistUrl = 'http://localhost:8080/api/artistes';

    constructor(private httpClient: HttpClient) {};

    getArtists(): Observable<Artist[]> {
        return this.httpClient.get<ResponseArtistesI>(this.artistUrl).pipe(
            map(response => response._embedded.artistes)
          );
    }

    getArtistById(id: number): Observable<Artist> {
        const artistUrl = `${this.artistUrl}/${id}`;
        return this.httpClient.get<Artist>(artistUrl);
    }

}