import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  @Input() product: Product;

  buttonText: string;

  constructor(
    private productsService:ProductsService,
    private cartService:CartService,
    private route:ActivatedRoute,
    private location:Location) { }

  ngOnInit(): void {
    this.buttonText = 'Acheter';
    this.getProduct();
  }

  getProduct() :void {
    const productId = +this.route.snapshot.params['id'];
    // OU : const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productsService.getProductById(productId)
    .subscribe(product => this.product=product);
  }

  onAddToCart(myProduct : Product) {
    const myCartItem : CartItem = new CartItem(myProduct);
    this.cartService.addToCart(myCartItem);
    this.buttonText = "Hop! Au panier!";
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
