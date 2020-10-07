import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { BehaviorSubject, Subject } from 'rxjs';
import { Place } from '../shared/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  placesChanged = new Subject<Place[]>();
  placeSelected = new BehaviorSubject<Place>(null);
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
    console.log(unformatedPlace);
    
    const place = new Place(
      unformatedPlace.name,
      unformatedPlace.formatted_address,
      unformatedPlace.geometry.location.toJSON(),
      unformatedPlace.photos && unformatedPlace.photos.length > 0 ? unformatedPlace.photos[0].getUrl() : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQXBKqhH8VS4qdb6Lcu-6SOe0qKxQmZo3pJvQ&usqp=CAU',
      unformatedPlace.opening_hours ? unformatedPlace.opening_hours.weekday_text : null,
      unformatedPlace.opening_hours ? unformatedPlace.opening_hours.isOpen() : null,
      unformatedPlace.website ? unformatedPlace.website : null,
      unformatedPlace.international_phone_number ? unformatedPlace.international_phone_number : null,
      unformatedPlace.rating ? unformatedPlace.rating : null,
    )

    this.places.push(place);

    console.log(place);
    
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
      fields: ['name', 'formatted_address', 'rating', 'international_phone_number', 'geometry', 'opening_hours', 'utc_offset_minutes', 'photos', 'website']
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
