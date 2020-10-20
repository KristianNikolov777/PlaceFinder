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
  cyprusDefaultpos: google.maps.LatLngLiteral = { lat: 35.095192, lng: 33.20343 };
  defaultZoom = 8.3;
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

  // @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {
    let previousMarker: google.maps.Marker;
    console.log(previousMarker);
    
    this.placesChangedSub = this.placeService.placesChanged.subscribe(
      (places: Place[]) => {
       
        if (places.length < 1) return

        this.deleteMarkers();

        places.forEach((place) => {
          this.preloadMarker(place.location, place.name);
        });
        console.log(this.preloadedMarkers);
        
        this.loadAllMarkers();
      }
    );

    this.placeSelectedSub = this.placeService.placeSelected.subscribe(
      (place: Place) => {
        console.log(previousMarker);
        
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
            
          console.log(selectedMarker) 
          
          if (previousMarker && previousMarker.getTitle() !== selectedMarker.getTitle() ) {
            this.clearMarkerAnimation(previousMarker)
          }
          this.map.setCenter(selectedMarker.getPosition());
          this.map.setZoom(13);
          this.highlightMarker(selectedMarker);
          previousMarker = selectedMarker;
          // this.clearMarkersAnimation();
          console.log(selectedMarker.getAnimation())
          
          
        // }
      }
    );

    this.searchChangedSub = this.placeService.searchModeChanged.subscribe(() => {
      if (!this.map) return
      this.deleteMarkers();
      this.placeService.resetPlaces();
      this.map.setCenter(this.cyprusDefaultpos);
      this.map.setZoom(this.defaultZoom)
    })
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
      options: { draggable: false, animation: google.maps.Animation.DROP, icon: '../../assets/images/marker.png' },
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
    // this.clearMarkersAnimation();
    // this.highlightMarker(marker);

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
    this.markers.forEach(this.clearMarkerAnimation);
  }

  clearMarkerAnimation(marker: google.maps.Marker) {
    marker.setAnimation(null)
  }

  ngOnDestroy() {
    this.placesChangedSub.unsubscribe();
    this.placeSelectedSub.unsubscribe();
    this.searchChangedSub.unsubscribe();
  }

  // getCurrentPos(): Promise<google.maps.LatLngLiteral> | google.maps.LatLngLiteral {

  //   if (navigator.geolocation) {
  //     return new Promise((resolve, reject) => {
  //       navigator.geolocation.getCurrentPosition(function (position) {
  //         resolve({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         });

  //         reject(this.cyprusDefaultpos);
  //       });
  //     })
  //   } else {
  //     return this.cyprusDefaultpos;
  //   }
  // }
}
