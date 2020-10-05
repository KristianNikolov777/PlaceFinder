import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../places-search/place.service';
import { Place } from '../shared/place.model';

@Component({
  selector: 'app-places-listing',
  templateUrl: './places-listing.component.html',
  styleUrls: ['./places-listing.component.scss']
})
export class PlacesListingComponent implements OnInit {
  places: Place[]

  constructor(private placeService: PlaceService) { }

  ngOnInit(): void {
    this.placeService.placesChanged.subscribe((places: Place []) => {
      this.places = places;
    })
  }

}
