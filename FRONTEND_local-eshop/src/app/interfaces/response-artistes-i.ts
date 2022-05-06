import { Artist } from "../models/artist.model";

export interface ResponseArtistesI {

    _embedded: {
        artistes: Artist[];
    },
    page: {
      size: number,
      totalElements: number,
      totalPages: number,
      number: number
    }
    
}
