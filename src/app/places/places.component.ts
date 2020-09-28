import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  address: {};

  constructor() { }

  ngOnInit(): void {
  }

  getAddress(place: object) { 
    this.address = place['formatted_address'];
    console.log(this.address)
  }

}
