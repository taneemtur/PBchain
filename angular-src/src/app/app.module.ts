import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PListingComponent } from './components/p-listing/p-listing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { ListingComponent } from './components/listing/listing.component';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { PDetailsComponent } from './components/p-details/p-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PListingComponent,
    ListingComponent,
    NavComponent,
    AddPropertyComponent,
    PDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FlexLayoutModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
