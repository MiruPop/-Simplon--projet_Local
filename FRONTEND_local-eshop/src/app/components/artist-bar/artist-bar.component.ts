import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist } from 'src/app/models/artist.model';
import { ArtistsService } from 'src/app/services/artists.service';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-artist-bar',
  templateUrl: './artist-bar.component.html',
  styleUrls: ['./artist-bar.component.scss']
})
export class ArtistBarComponent implements OnInit {

  @Input() artist: Artist;
  sampleProducts: Product[];

  constructor(private service : ProductsService) { }

  ngOnInit(): void {
    this.getSampleProducts();
  }

  getSampleProducts() {
    this.service.getProductsByArtist(this.artist.id)
    .subscribe(
      data => {
        this.sampleProducts = data.slice(0,3);
      }
    );
  }

}
