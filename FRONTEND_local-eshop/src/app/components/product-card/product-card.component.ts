import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;

  buttonText: string;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.buttonText = 'Acheter';
  }

  onAddToCart(myProduct : Product) {

    const myCartItem : CartItem = new CartItem(myProduct);
    this.cartService.addToCart(myCartItem);
    this.buttonText = "Hop! Au panier!";
  }
}
