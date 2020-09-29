import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapModule } from './google-map/google-map.module';
import { PlacesComponent } from './places/places.component';
import { PlacesSearchComponent } from './places/places-search/places-search.component';
import { PlacesListingComponent } from './places/places-listing/places-listing.component';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'; 
import { FormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { PlaceDetailComponent } from './places/places-listing/place-detail/place-detail.component';
import { PlaceItemComponent } from './places/places-listing/place-item/place-item.component';

@NgModule({
  declarations: [
    AppComponent,
    PlacesComponent,
    PlacesSearchComponent,
    PlacesListingComponent,
    PlaceDetailComponent,
    PlaceItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    GoogleMapModule,
    GooglePlaceModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
