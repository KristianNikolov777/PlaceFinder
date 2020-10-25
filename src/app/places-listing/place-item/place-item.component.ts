import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlaceService } from 'src/app/places-search/place.service';
import { Place } from 'src/app/shared/place.model';

@Component({
  selector: 'app-place-item',
  templateUrl: './place-item.component.html',
  styleUrls: ['./place-item.component.scss']
})
export class PlaceItemComponent implements OnInit, OnDestroy {
  @Input() place: Place;
  selectedPlace: Place;
  selectedPlaceSub: Subscription;

  constructor(private placeService: PlaceService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.selectedPlaceSub = this.placeService.placeSelected.subscribe((place: Place) => {
      if (!place) return;
      
      this.selectedPlace = place;
      this.cd.detectChanges()
    })
    
  }

  onSelectPlace() {
    this.placeService.placeSelected.next(this.place);
  }

  ngOnDestroy() {
    this.selectedPlaceSub.unsubscribe();
  }

 
}
