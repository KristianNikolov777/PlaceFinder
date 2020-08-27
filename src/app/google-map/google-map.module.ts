import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {GoogleMapsModule} from '@angular/google-maps';

import {GoogleMapComponent} from './google-map.component';

@NgModule({
    imports: [
      CommonModule,
      GoogleMapsModule,
    ],
    declarations: [GoogleMapComponent],
    exports: [GoogleMapComponent]
  })

export class GoogleMapModule {
}