import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { LatLngLiteral } from 'ngx-google-places-autocomplete/objects/latLng';
import { Subscription } from 'rxjs';
import { PlaceService } from '../places-search/place.service';
import { Place } from '../shared/place.model';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('map', { static: false }) mapComponent: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  markersArray: MapMarker[] = [];
  markersPlaced = false;

  placeSubscription: Subscription;
  selectedPlaceSub: Subscription;

  options: google.maps.MapOptions = {
    center: this.getCurrentPos(),
    zoom: 8.3,
    disableDefaultUI: true,
  };

  markerOptions = { draggable: false, animation: google.maps.Animation.DROP };
  markerPositions: google.maps.LatLngLiteral[] = [];
  display?: google.maps.LatLngLiteral;

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {
    this.placeSubscription = this.placeService.placesChanged.subscribe(
      (places: Place[]) => {
        this.markerPositions = [];
        places.forEach((place) => {
          this.addMarker(place.location);
        });
        this.markersPlaced = true;
      }
    );

    this.selectedPlaceSub = this.placeService.placeSelected.subscribe((place: Place) => {
    if (this.markersPlaced) {
      
      console.log(this.mapComponent.googleMap);
      
      
    }
     
    })
  }

  ngAfterViewInit() {
    this.placeService.initGooglePlacesService(this.mapComponent.googleMap);
  }

  getCurrentPos() {
    let pos: google.maps.LatLngLiteral = { lat: 35.095192, lng: 33.20343 };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
      console.log(pos);

      return pos;
    }
  }

  addMarker(location: LatLngLiteral) {
    this.markerPositions.push(location);
  }

  move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }

  async onSelectMarker(marker: MapMarker) {
    // console.log(marker);
    marker.options = { draggable: false, animation: google.maps.Animation.BOUNCE }
    const places: Place[] = this.placeService.getPlaces();
    // console.log(places);
    const markerLocation = await {
      lat: marker.marker.getPosition().lat(),
      lng: marker.marker.getPosition().lng(),
    };
    // console.log(markerLocation);
    
    const markerPlace: Place = places.find((place) => {
      return place.location.lat === markerLocation.lat && place.location.lng === markerLocation.lng
    });

    this.placeService.placeSelected.next(markerPlace)
    // console.log(markerPlace);

    console.log(this.infoWindow);
    
    // this.infoWindow.infoWindow.content = markerPlace.name;
    // this.infoWindow.open(marker);
  }

  removeLastMarker() {
    this.markerPositions.pop();
  }

  highlightMarker() {

  }

  ngOnDestroy() {
    this.placeSubscription.unsubscribe();
  }
}
