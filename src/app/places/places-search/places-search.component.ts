import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-places-search',
  templateUrl: './places-search.component.html',
  styleUrls: ['./places-search.component.scss'],
})
export class PlacesSearchComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  // defaultBounds = new google.maps.LatLngBounds(
  //   new google.maps.LatLng(-33.8902, 151.1759),
  //   new google.maps.LatLng(-33.8474, 151.2631)
  // );
  options = {
    // bounds: this.defaultBounds,
    componentRestrictions:{ 
      country:["CY"] 
    },
    types: ['establishment'],
  };
  autocompleteInput: string;
  formattedaddress: string;
  

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
  }

  public AddressChange(address: any) { 
    //setting address from API to local variable 
    console.log(address);
    
     this.formattedaddress = address.formatted_address; 
  } 

  // private getPlaceAutocomplete() {
  //   if (this.searchInput.nativeElement) {
  //     // const autocomplete = new google.maps.places.Autocomplete(
  //     //   this.searchInput.nativeElement,
  //     //   this.options
  //     // );
  //     // google.maps.event.addListener(autocomplete, 'place_changed', () => {
  //     //   const place = autocomplete.getPlace();
  //     //   this.invokeEvent(place);
  //     // });
  //     console.log(this.searchInput.nativeElement);
  //     console.log(google.maps);
      
      
  //   }
  // }

  // invokeEvent(place: Object) {
  //   this.setAddress.emit(place);
  // }
}
