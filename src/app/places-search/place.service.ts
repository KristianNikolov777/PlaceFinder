import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Place } from '../shared/place.model';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  placesChanged = new Subject<Place[]>();
  placeSelected = new BehaviorSubject<Place>(null);
  searchModeChanged = new BehaviorSubject<string>('byPlace')

  googlePlacesService: google.maps.places.PlacesService;

  constructor() {}

  private places: Place[] = [];

  // getPlace (index: number) {
  //   return this.places[index];
  // }

  getPlaces() {
    return [...this.places];
  }

  createPlace(unformatedPlace: any) {
    const place = new Place(
      unformatedPlace.name,
      unformatedPlace.formatted_address,
      unformatedPlace.geometry.location.toJSON(),
      unformatedPlace.photos && unformatedPlace.photos.length > 0
        ? unformatedPlace.photos[0].getUrl()
        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQXBKqhH8VS4qdb6Lcu-6SOe0qKxQmZo3pJvQ&usqp=CAU',
      unformatedPlace.opening_hours
        ? unformatedPlace.opening_hours.weekday_text
        : null,
      unformatedPlace.opening_hours
        ? unformatedPlace.opening_hours.isOpen()
        : null,
      unformatedPlace.website ? unformatedPlace.website : null,
      unformatedPlace.international_phone_number
        ? unformatedPlace.international_phone_number
        : null,
      unformatedPlace.rating ? unformatedPlace.rating : null
    );

    return place;
  }

  setPlaces(places: Place[]) {
    this.places = places;
    this.placesChanged.next([...this.places]);
  }

  resetPlaces() {
    this.places = [];
    this.placesChanged.next([]);
  }

  initGooglePlacesService(map: google.maps.Map) {
    this.googlePlacesService = new google.maps.places.PlacesService(map);
  }

  getPlacesDetails(unformatedPlaces: any): Promise<any> {
    return Promise.all(unformatedPlaces.map(this.getPlaceDetails.bind(this)));
  }

  getPlaceDetails(unformatedPlace): Promise<any> {
    return new Promise((resolve, reject) => {
      const request: google.maps.places.PlaceDetailsRequest = {
        placeId: unformatedPlace.place_id,
        fields: [
          'name',
          'formatted_address',
          'rating',
          'international_phone_number',
          'geometry',
          'opening_hours',
          'utc_offset_minutes',
          'photos',
          'website',
        ],
      };

      this.googlePlacesService.getDetails(request, function (
        placeResult,
        status
      ) {
        if (status == 'OK') {
          resolve(placeResult);
        } else {
          reject(status);
        }
      });
    }).catch((error) => {
      console.log(error);
    });
  }
}
