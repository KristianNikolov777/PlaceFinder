import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { Place } from '../shared/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  placesChanged = new Subject<Place[]>();
  googlePlacesService: google.maps.places.PlacesService;
  
  

  constructor() { }

  private places: Place[] = [];
  
  getPlace (index: number) {
    return this.places[index];
  }

  getPlaces () {
    return [...this.places];
  }

  setPlace (unformatedPlace: any) {
    // console.log(unformatedPlace);
    
    const place = new Place(
      unformatedPlace.name,
      unformatedPlace.international_phone_number,
      unformatedPlace.vicinity,
      unformatedPlace.opening_hours.isOpen(),
      unformatedPlace.rating,
      unformatedPlace.opening_hours.weekday_text,
      unformatedPlace.photos[0].getUrl(),
      unformatedPlace.website,
      unformatedPlace.geometry.location.toJSON()
    )

    this.places.push(place);

    // console.log(place);
    
    this.placesChanged.next([...this.places]);
  }

  resetPlaces() {
    this.places = [];
  }

  initGooglePlacesService(map: google.maps.Map) {
    this.googlePlacesService = new google.maps.places.PlacesService(map);
  }

 async getPlaceDetails(unformatedPlace: any) {
    let request: google.maps.places.PlaceDetailsRequest = 
    {
      placeId: unformatedPlace.place_id,
      fields: ['name', 'vicinity', 'rating', 'international_phone_number', 'geometry', 'opening_hours', 'utc_offset_minutes', 'photos', 'website']
    };
   

    
    
    this.googlePlacesService.getDetails(request, (place, status) => {
      // console.log(place);
      // console.log(status);
      // if (status === 'OK') {
      //   this.setPlace(place);
      // }
      if (status !== 'OK') return;
      
      this.setPlace(place);
      
      
      
    })
  }

}
