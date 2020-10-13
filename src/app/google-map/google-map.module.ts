import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import {GoogleMapComponent} from './google-map.component';

@NgModule({
    imports: [
      CommonModule,
      HttpClientModule,
      HttpClientJsonpModule
    ],
    declarations: [GoogleMapComponent],
    exports: [GoogleMapComponent]
  })

export class GoogleMapModule {
}