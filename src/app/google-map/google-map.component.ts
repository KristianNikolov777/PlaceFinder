import { Component, OnInit, ViewChild } from '@angular/core';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  options: google.maps.MapOptions = {
    center: {lat: 35.095192, lng: 33.203430},
    zoom: 8.3,
    disableDefaultUI: true
  }

  center = {lat: 24, lng: 12};
  markerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 4;
  display?: google.maps.LatLngLiteral;

  addMarker(event: google.maps.MouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
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

}
