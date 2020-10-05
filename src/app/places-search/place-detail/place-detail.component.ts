import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/shared/place.model';
import { PlaceService } from '../place.service';
@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss']
})
export class PlaceDetailComponent implements OnInit, OnDestroy {
  place: Place; 
  placeSubscription: Subscription;

  constructor(private placeService: PlaceService) { }

  ngOnInit(): void {
    this.placeSubscription = this.placeService.placesChanged.subscribe((places: Place []) => {
      this.place = places[0];
    })
  }

  ngOnDestroy() {
    this.placeSubscription.unsubscribe()
  }

  

}
