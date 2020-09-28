import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Place } from '../shared/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  addressChanged = new Subject<Place>();

  constructor() { }

  private place: Place;
  
  getPlace () {
    return {...this.place};
  }

  setPlace (address: any) {
    this.place = new Place(
      address.name,
      address.international_phone_number,
      address.vicinity,
      address.opening_hours.isOpen(),
      address.rating,
      address.opening_hours.weekday_text,
      address.photos[0].getUrl(),
      address.website
    )
    console.log(this.place);
    console.log(address.opening_hours.isOpen());
    
    this.addressChanged.next({...this.place});
  }
}
