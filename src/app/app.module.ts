import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapModule } from './google-map/google-map.module';
import { PlacesComponent } from './places/places.component';
import { PlacesSearchComponent } from './places/places-search/places-search.component';
import { PlacesListingComponent } from './places/places-listing/places-listing.component';
import {MatInputModule} from '@angular/material/input'
import { FormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    PlacesComponent,
    PlacesSearchComponent,
    PlacesListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    GoogleMapModule,
    GooglePlaceModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
