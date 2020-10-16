import { Component, OnDestroy, OnInit } from '@angular/core';
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
  placeChangedSub: Subscription;
  searchChangedSub: Subscription;

  constructor(private placeService: PlaceService) { }

  ngOnInit(): void {
   this.placeChangedSub = this.placeService.placesChanged.subscribe((places: Place []) => {
      this.places = places;
    })
    this.searchChangedSub = this.placeService.searchModeChanged.subscribe((searchMode) => {
      this.searchMode = searchMode;
    })
  }

  ngOnDestroy() {
    this.placeChangedSub.unsubscribe();
    this.searchChangedSub.unsubscribe();
  }

}
