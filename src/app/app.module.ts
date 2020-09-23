import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapModule } from './google-map/google-map.module';
import { PlacesComponent } from './places/places.component';
import { PlacesSearchComponent } from './places/places-search/places-search.component';
import { PlacesListingComponent } from './places/places-listing/places-listing.component';

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
    BrowserAnimationsModule,
    GoogleMapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
