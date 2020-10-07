import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { PlaceService } from './place.service';

@Component({
  selector: 'app-places-search',
  templateUrl: './places-search.component.html',
  styleUrls: ['./places-search.component.scss'],
})
export class PlacesSearchComponent implements OnInit, AfterViewInit {
  @ViewChild('searchBoxEl', { static: false }) searchBoxEl: ElementRef;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  
  defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(35.1731247015, 34.0048808123),
    new google.maps.LatLng(34.5718694118, 32.2566671079)
  );
  options = {
    bounds: this.defaultBounds,
    componentRestrictions:{ 
      country:["CY"] 
    },
    types: ['establishment'],
    // fields: ['name', 'formatted_address', 'rating', 'international_phone_number', 'geometry', 'opening_hours', 'utc_offset_minutes', 'photos', 'website']
  };
  autocompleteInput: string;
  
  

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
   this.getPlaceAutocomplete()
  }

  public onAddressChange(address: any) { 
      
      this.placeService.resetPlaces()
      this.placeService.setPlace(address);
      console.log(address);
      
  } 

  private getPlaceAutocomplete() {
    if (!this.searchBoxEl) return;
    const searchBox = new google.maps.places.SearchBox(this.searchBoxEl.nativeElement, this.options);
      google.maps.event.addListener(searchBox, 'places_changed', () => {
        const unformatedPlaces = searchBox.getPlaces();
        // console.log(unformatedPlaces);
        this.placeService.resetPlaces();
        unformatedPlaces.forEach((unformatedPlace) => {
          this.placeService.getPlaceDetails(unformatedPlace);
        })
        
        // this.invokeEvent(places);
        // console.log(searchBox);
        
      });
      // console.log(this.searchBoxEl.nativeElement);
  }

  // invokeEvent(places: Object) {
  //   this.setAddress.emit(places);
  // }

  emptyInput(inputFieldRef: ElementRef) {
    this.searchBoxEl.nativeElement.value = null;
  }
}
