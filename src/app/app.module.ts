import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'; 
import { MatTabsModule } from '@angular/material/tabs'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapModule } from './google-map/google-map.module';
import { PlacesSearchComponent } from './places-search/places-search.component';
import { PlacesListingComponent } from './places-listing/places-listing.component';
import { PlaceDetailComponent } from './places-search/place-detail/place-detail.component';
import { PlaceItemComponent } from './places-listing/place-item/place-item.component';

@NgModule({
  declarations: [
    AppComponent,
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
    MatCardModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
