import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Place } from 'src/app/shared/place.model';
import { PlaceService } from '../place.service';


@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.scss'],
})
export class PlaceDetailComponent implements OnInit, OnDestroy {
  place: Place;
  placesChangedSub: Subscription;
  placeSelectedSub: Subscription;
  loadingStatusSub: Subscription;
  placeIsLoading: boolean;

  constructor(
    private placeService: PlaceService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.placesChangedSub = this.placeService.placesChanged.subscribe(
      (places: Place[]) => {
        if (!places || places.length === 0) {
          this.place = null;
          return;
        }
        this.placeService.placeSelected.next(places[0]);
      }
    );

    this.placeSelectedSub = this.placeService.placeSelected.subscribe(
      (place: Place) => {
        this.place = place;

        if (place) {
          this.placeService.placeIsLoading.next(false);
        }
      }
    );

    this.loadingStatusSub = this.placeService.placeIsLoading.subscribe(
      (placeIsLoading: boolean) => {
        this.placeIsLoading = placeIsLoading;
        this.cd.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.placesChangedSub.unsubscribe();
    this.placeSelectedSub.unsubscribe();
    this.loadingStatusSub.unsubscribe();
  }
}
