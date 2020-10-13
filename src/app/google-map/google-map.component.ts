import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  placeSub: Subscription;
  placeSelectedSub: Subscription;
  map: google.maps.Map;
  mapOptions: google.maps.MapOptions = {
    center: this.getCurrentPos(),
    zoom: 8.3,
    disableDefaultUI: true,
  };
  markerInfo;
  preloadedMarkers = [];
  markers: google.maps.Marker[] = [];
  markerOptions = { draggable: false, animation: google.maps.Animation.DROP };
  markerPositions: google.maps.LatLngLiteral[] = [];

  // @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {
    this.placeSub = this.placeService.placesChanged.subscribe(
      (places: Place[]) => {
        this.deleteMarkers();
        console.log(places);

        places.forEach((place) => {
          this.preloadMarker(place.location, place.name);
        });
        console.log(this.preloadedMarkers);

        this.loadAllMarkers();
      }
    );

    this.placeSelectedSub = this.placeService.placeSelected.subscribe(
      (place: Place) => {
        if (place == null) return;

        const selectedMarker: google.maps.Marker = this.markers.find(
          (marker) => {
            const markerLocation = {
              lat: marker.getPosition().lat(),
              lng: marker.getPosition().lng(),
            };

            return (
              markerLocation.lat === place.location.lat &&
              markerLocation.lng === place.location.lng
            );
          }
        );

        if (
          selectedMarker.getAnimation() == null ||
          selectedMarker.getAnimation() === 2
        ) {
          this.clearMarkersAnimation();
          this.highlightMarker(selectedMarker);
        }
      }
    );
  }

  ngAfterViewInit() {
    this.mapInitializer();
    this.placeService.initGooglePlacesService(this.map);
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
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

  preloadMarker(position: LatLngLiteral, placeName: string) {
    this.markerInfo = {
      position: new google.maps.LatLng(position.lat, position.lng),
      map: this.map,
      title: placeName,
      options: { draggable: false, animation: google.maps.Animation.DROP },
    };
    this.preloadedMarkers.push(this.markerInfo);
  }

  loadAllMarkers() {
    this.preloadedMarkers.forEach((markerInfo) => {
      const marker = new google.maps.Marker({ ...markerInfo });
      marker.addListener('click', () => {
        this.onClickMarker(marker);
      });
      marker.setMap(this.map);
      this.markers.push(marker);

      // const infoWindow = new google.maps.InfoWindow({
      //   content: marker.getTitle()
      // });
      // infoWindow.open(marker.getMap(), marker);
    });
  }

  clearMarkers() {
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });
  }

  deleteMarkers() {
    this.clearMarkers();
    this.preloadedMarkers = [];
    this.markers = [];
  }

  onClickMarker(marker: google.maps.Marker) {
    this.clearMarkersAnimation();
    this.highlightMarker(marker);

    const places: Place[] = this.placeService.getPlaces();
    const markerLocation = {
      lat: marker.getPosition().lat(),
      lng: marker.getPosition().lng(),
    };
    const markerPlace: Place = places.find((place) => {
      return (
        place.location.lat === markerLocation.lat &&
        place.location.lng === markerLocation.lng
      );
    });
    this.placeService.placeSelected.next(markerPlace);
  }

  highlightMarker(marker: google.maps.Marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }

  clearMarkersAnimation() {
    this.markers.forEach((marker) => {
      marker.setAnimation(null);
    });
  }

  ngOnDestroy() {
    this.placeSub.unsubscribe();
    this.placeSelectedSub.unsubscribe();
  }
}
