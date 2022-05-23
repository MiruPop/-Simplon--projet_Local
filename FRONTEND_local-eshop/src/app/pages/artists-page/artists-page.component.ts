import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist } from 'src/app/models/artist';
import { ArtistsService } from 'src/app/services/artists.service';

@Component({
  selector: 'app-artists-page',
  templateUrl: './artists-page.component.html',
  styleUrls: ['./artists-page.component.scss']
})
export class ArtistsPageComponent implements OnInit {

  artists : Artist[] = [];

  constructor(private service : ArtistsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      () => {
        this.listArtists();
      });
  }

  listArtists() {
    this.service.getArtists().subscribe(
      data => {
        this.artists = data;
      }
    )
  }

}
