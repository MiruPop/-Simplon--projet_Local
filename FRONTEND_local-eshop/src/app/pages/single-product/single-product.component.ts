import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  // @Input() product: Product;
  product : Product = new Product();

  constructor(
    private productsService:ProductsService,
    private route:ActivatedRoute,
    private location:Location) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() :void {
    const productId = +this.route.snapshot.params['id'];
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productsService.getProductById(productId)
    .subscribe(product => this.product=product);
  }

  goBack():void {
    this.location.back();
  }

  isBetween(value:number) : boolean {
    if(value > 0 && value <= 3) {
      return true;
    } else {
      return false;
    }
  }
}
