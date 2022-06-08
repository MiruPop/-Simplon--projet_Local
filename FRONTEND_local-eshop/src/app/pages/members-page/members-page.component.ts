import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.scss']
})
export class MembersPageComponent implements OnInit {

  storage: Storage = sessionStorage;
  connectedClient: Customer;

  constructor() { }

  ngOnInit(): void {
    this.connectedClient = JSON.parse(this.storage.getItem('customer'));
  }

}
