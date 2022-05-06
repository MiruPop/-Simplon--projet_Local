import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist } from 'src/app/models/artist.model';
import { ArtistsService } from 'src/app/services/artists.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

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
