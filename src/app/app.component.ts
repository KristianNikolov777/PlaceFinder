import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PlaceService } from './places-search/place.service';
import { Place } from './shared/place.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PlaceFinder';
  listIsActive = false;

  constructor(
    private placeService: PlaceService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.placeService.placesChanged.subscribe((places: Place []) => {
      this.listIsActive = places.length > 1 ? true : false;
      this.cd.detectChanges();
    });
  }

}
