import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Place } from '../shared/place.model';
import { PlaceService } from './place.service';

@Component({
  selector: 'app-places-search',
  templateUrl: './places-search.component.html',
  styleUrls: ['./places-search.component.scss'],
})
export class PlacesSearchComponent implements OnInit, AfterViewInit {
  @ViewChild('searchBoxEl', { static: false }) searchBoxEl: ElementRef;
  @ViewChild('autocompleteEl', { static: false }) autocompleteEl: ElementRef;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();

  searchMode = 'byPlace';
  defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(35.1731247015, 34.0048808123),
    new google.maps.LatLng(34.5718694118, 32.2566671079)
  );
  options = {
    bounds: this.defaultBounds,
    componentRestrictions: {
      country: ['CY'],
    },
    types: ['establishment'],
    // fields: ['name', 'formatted_address', 'rating', 'international_phone_number', 'geometry', 'opening_hours', 'utc_offset_minutes', 'photos', 'website']
  };
  autocompleteInput: string;

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.createSearchbox();
  }

  //This method is called when we search by place
  onAddressChange(address: any) {
    this.placeService.resetPlaces();
    const place = this.placeService.createPlace(address);
    this.placeService.setPlaces([place]);
  }

  //This method is called when we search by query
  createSearchbox() {
    if (!this.searchBoxEl) return;
    const searchBox = new google.maps.places.SearchBox(
      this.searchBoxEl.nativeElement,
      this.options
    );
    google.maps.event.addListener(searchBox, 'places_changed', () => {
      this.placeService.placeIsLoading.next(true);
      const unformatedPlaces = searchBox.getPlaces();
      this.placeService.resetPlaces();
      this.placeService.getPlacesDetails(unformatedPlaces).then((results) => {
        const places: Place[] = results
          .filter((result) => result != undefined)
          .map(this.placeService.createPlace);

        this.placeService.setPlaces([...places]);
      });
    });
  }

  public onSelectedTabChange(matTabChange: MatTabChangeEvent) {
    this.emptyInput();
    this.searchMode = matTabChange.index === 0 ? 'byPlace' : 'byQuery';
    this.placeService.searchModeChanged.next(this.searchMode);
  }

  emptyInput() {
    this.searchBoxEl.nativeElement.value = null;
    this.autocompleteEl.nativeElement.value = null;
  }
}
