import { Component, OnInit } from '@angular/core';
import { Artist } from '../models/artist.model';
import { ArtistsService } from '../services/artists.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {

  artists : Artist[];

  constructor(private artistService : ArtistsService) { }

  ngOnInit(): void {
    this.getArtistList();
  }

  getArtistList() {
    this.artistService.getArtists().subscribe(
      data => {
        this.artists = data;
      }
    );
  }

}
