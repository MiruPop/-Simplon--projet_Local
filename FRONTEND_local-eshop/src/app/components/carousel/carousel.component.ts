import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
images = [
  'https://i.postimg.cc/VkM8pMZ5/carousel2.jpg',
  'https://i.postimg.cc/VkM8pMZ5/carousel3.jpg',
  'https://i.postimg.cc/VkM8pMZ5/carousel4.jpg'
]
  constructor() { }

  ngOnInit(): void {
    this.images;
  }

}
