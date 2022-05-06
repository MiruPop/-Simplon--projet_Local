import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Artist } from '../../models/artist.model';
import { Product } from '../../models/product.model';
import { ArtistsService } from '../../services/artists.service';

@Component({
  selector: 'app-presentation-page',
  templateUrl: './presentation-page.component.html',
  styleUrls: ['./presentation-page.component.scss']
})
export class PresentationPageComponent implements OnInit {

  artist : Artist;
  products: Product[];
  
  constructor(private artistService : ArtistsService,
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router : Router) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(() => {
    //   this.getArtistDetails();
    // });
    this.getArtistDetails();
  }

  getArtistDetails() {
    // get paramètre d'url "id" et le convertir en nbr en utilisant le "+"
    const artistId = +this.route.snapshot.params['id'];
        // const artistId:number = +this.route.snapshot.paramMap.get('id')!;
        // const artistId = Number(this.route.snapshot.paramMap.get('id'));

    this.artistService.getArtistById(artistId).subscribe(
      data => {
        console.log(data);
        // this.artist = data2;
        this.artist = data;
      }
    )

        this.productService.getProductsByArtist(artistId).subscribe(
      data1 => {
        this.products = data1;
      }
    )
  }

  onNavigate(){
     this.router.navigateByUrl(this.artist.facebookLink);
     window.open(this.artist.facebookLink, "_blank");
    }
    


}
