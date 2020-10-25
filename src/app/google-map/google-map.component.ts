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
  placesChangedSub: Subscription;
  placeSelectedSub: Subscription;
  searchChangedSub: Subscription;
  map: google.maps.Map;
  cyprusDefaultpos: google.maps.LatLngLiteral = {
    lat: 35.095192,
    lng: 33.20343,
  };
  defaultZoom = window.screen.width <= 768 ? 7.6 : 8.3;
  mapOptions: google.maps.MapOptions = {
    center: this.cyprusDefaultpos,
    zoom: this.defaultZoom,
    disableDefaultUI: true,
  };
  markerInfo;
  preloadedMarkers = [];
  markers: google.maps.Marker[] = [];
  markerOptions = { draggable: false, animation: google.maps.Animation.DROP };
  markerPositions: google.maps.LatLngLiteral[] = [];
  infoWindow: google.maps.InfoWindow;

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {
    let previousMarker: google.maps.Marker;

    this.placesChangedSub = this.placeService.placesChanged.subscribe(
      (places: Place[]) => {
        if (places.length < 1) return;

        this.deleteMarkers();

        places.forEach((place) => {
          this.preloadMarker(place.location, place.name);
        });

        this.loadAllMarkers();
      }
    );

    this.placeSelectedSub = this.placeService.placeSelected.subscribe(
      (place: Place) => {
        if (place == null) return;

        //Close the infowindow every time a place is selected.
        if (this.infoWindow) {
          this.infoWindow.close();
        }

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

        //Clear previous marker animation in case the user didn't choose the same place twice
        if (
          previousMarker &&
          previousMarker.getPosition().toString() !==
            selectedMarker.getPosition().toString()
        ) {
          this.clearMarkerAnimation(previousMarker);
        }

        //Center and zoom the map on the selected place every time there is one
        this.map.setCenter(selectedMarker.getPosition());
        this.map.setZoom(16);
        this.highlightMarker(selectedMarker);
        previousMarker = selectedMarker;

        //Show infoWindow for smaller devices only(For the bigger devices we show the placeDetail component).
        if (window.screen.width <= 768) {
          this.showInfoWindow(selectedMarker, place);
        }
      }
    );

    this.searchChangedSub = this.placeService.searchModeChanged.subscribe(
      () => {
        //Reset the map on searchmode change
        if (!this.map) return;
        this.deleteMarkers();
        this.placeService.resetPlaces();
        this.map.setCenter(this.cyprusDefaultpos);
        this.map.setZoom(this.defaultZoom);
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

  highlightMarker(marker: google.maps.Marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }

  clearMarkerAnimation(marker: google.maps.Marker) {
    marker.setAnimation(null);
  }

  onClickMarker(marker: google.maps.Marker) {
    //Once a marker is clicked we emit the marker's place as a selected place. 
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

  showInfoWindow(marker: google.maps.Marker, place: Place) {
    this.infoWindow = new google.maps.InfoWindow({
      content: `<div class="custom-info-window">
          <img height="60" width="auto" src="${place.imgUrl}" alt=""/>
            <div class="title">${place.name}</div>
            <div class="subtitle">${place.address}</div>
            <div class="telno">${place.phoneNumber || ''}</div>
            <p>${place.rating || ''}</p>
            <a class="url" href="${place.webpageUrl || '#'}" target="_blank">${
        place.webpageUrl || ''
      }</a>
          </div>`,
    });
    this.infoWindow.open(marker.getMap(), marker);
  }

  ngOnDestroy() {
    this.placesChangedSub.unsubscribe();
    this.placeSelectedSub.unsubscribe();
    this.searchChangedSub.unsubscribe();
  }

}
