import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { LatLngLiteral } from 'ngx-google-places-autocomplete/objects/latLng';
import { Subscription } from 'rxjs';
import { PlaceService } from '../places-search/place.service';
import { Place } from '../shared/place.model';


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('map', {static: false}) mapComponent: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  
  placeSubscription: Subscription

  options: google.maps.MapOptions = {
    center: this.getCurrentPos() ,
    zoom: 8.3,
    disableDefaultUI: true
  };

  markerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  display?: google.maps.LatLngLiteral;
  
 
  constructor(private placeService: PlaceService) { 
  }

  ngOnInit(): void {
    this.placeSubscription = this.placeService.placesChanged.subscribe((places: Place[]) => {
      this.markerPositions = [];
      places.forEach((place) => {
       
    
        // this.addMarker(place.location);
      })
    })
  }

  ngAfterViewInit() {
    this.placeService.initGooglePlacesService(this.mapComponent.googleMap);
  }

  getCurrentPos() {
    let pos: google.maps.LatLngLiteral = {lat: 35.095192, lng:33.203430 };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
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

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  removeLastMarker() {
    this.markerPositions.pop();
  }

  ngOnDestroy() {
    this.placeSubscription.unsubscribe()
  }

}
