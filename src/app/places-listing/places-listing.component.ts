import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlaceService } from '../places-search/place.service';
import { Place } from '../shared/place.model';

@Component({
  selector: 'app-places-listing',
  templateUrl: './places-listing.component.html',
  styleUrls: ['./places-listing.component.scss']
})
export class PlacesListingComponent implements OnInit, OnDestroy {
  places: Place[];
  searchMode: string;
  placesAreLoading: boolean;
  placeChangedSub: Subscription;
  searchChangedSub: Subscription;
  loadingStatusSub: Subscription
  

  constructor(private placeService: PlaceService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
   this.placeChangedSub = this.placeService.placesChanged.subscribe((places: Place []) => {
      this.places = places;
    });

    this.searchChangedSub = this.placeService.searchModeChanged.subscribe((searchMode: string) => {
      this.searchMode = searchMode;
    })

    this.loadingStatusSub = this.placeService.placeIsLoading.subscribe((placesAreLoading: boolean) => {
      this.placesAreLoading = placesAreLoading;
      this.cd.detectChanges();
    })

    if (window.screen.width <= 768) {
      this.placeService.placeSelected.subscribe((selectedPlace: Place) => {
       if (this.places && this.places.length > 1) {
        this.places.splice(this.places.indexOf(selectedPlace), 1);
        this.places.unshift(selectedPlace);
        console.log(this.places);
       }
        
      } )
    }
  }

  ngOnDestroy() {
    this.placeChangedSub.unsubscribe();
    this.searchChangedSub.unsubscribe();
    this.loadingStatusSub.unsubscribe();
  }

}
