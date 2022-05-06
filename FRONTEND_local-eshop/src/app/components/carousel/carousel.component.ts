import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
images = [
  '/assets/images/carousel2.jpg',
  '/assets/images/carousel3.jpg',
  '/assets/images/carousel4.jpg',
]
  constructor() { }

  ngOnInit(): void {
  }

}
