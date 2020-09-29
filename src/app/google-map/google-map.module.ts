import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {GoogleMapsModule} from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import {GoogleMapComponent} from './google-map.component';

@NgModule({
    imports: [
      CommonModule,
      GoogleMapsModule,
      HttpClientModule,
      HttpClientJsonpModule
    ],
    declarations: [GoogleMapComponent],
    exports: [GoogleMapComponent]
  })

export class GoogleMapModule {
}