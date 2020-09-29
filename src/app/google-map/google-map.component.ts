import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { LatLngLiteral } from 'ngx-google-places-autocomplete/objects/latLng';
import { Subscription } from 'rxjs';
import { PlaceService } from '../places/place.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit, OnDestroy {
  placeSubscription: Subscription
 
  constructor(private placeService: PlaceService) { 
  }

  ngOnInit(): void {
    // this.getCurrentPos();
    this.placeSubscription = this.placeService.addressChanged.subscribe((place) => {
      this.addMarker(place.location);
    })
  }

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  // {lat: 35.095192, lng:33.203430 }

  options: google.maps.MapOptions = {
    center: this.getCurrentPos() ,
    zoom: 8.3,
    disableDefaultUI: true
  };

  center = {lat: 24, lng: 12};
  markerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 4;
  display?: google.maps.LatLngLiteral;

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

    // this.options = {
    //   center: pos ,
    //   zoom: 9,
    //   disableDefaultUI: true
    // }
  }

  addMarker(location: LatLngLiteral) {
    this.markerPositions = [];
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
