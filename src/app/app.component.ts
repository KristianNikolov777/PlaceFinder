import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PlaceFinder';
  address: {};

  getAddress(place: object) { 
    this.address = place['formatted_address'];
    console.log('------------------------------------');
    
    console.log(this.address)
  }
}
