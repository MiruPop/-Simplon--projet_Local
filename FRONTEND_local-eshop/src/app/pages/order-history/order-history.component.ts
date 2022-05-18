import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/models/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList: OrderHistory[] = [];
  storage: Storage = sessionStorage;

  constructor(private orderHistoryService: OrderHistoryService,
              private location:Location) { }

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory() {
    const theEmail = JSON.parse(this.storage.getItem('clientEmail'));

    this.orderHistoryService.getOrderHistory(theEmail).subscribe(
      data => {
        this.orderHistoryList = data._embedded.commandes;
      }
    )
  }

  goBack():void {
    this.location.back();
  }

}
