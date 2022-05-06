import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist } from 'src/app/models/artist.model';
import { ArtistsService } from 'src/app/services/artists.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  artists : Artist[] = [];

  constructor(private service: ArtistsService) { }

  ngOnInit(): void {
    this.getArtistList();
  }

  getArtistList() {
    this.service.getArtists().subscribe(
      data => {
        this.artists = data;
      }
    );
  }
}
