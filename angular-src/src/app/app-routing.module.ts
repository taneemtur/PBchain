import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { HomeComponent } from './components/home/home.component';
import { ListingComponent } from './components/listing/listing.component';
import { PDetailsComponent } from './components/p-details/p-details.component';

import { PListingComponent } from './components/p-listing/p-listing.component'


const routes: Routes = [
  {path : 'add-property', component : AddPropertyComponent},
  {path : 'listing', component : ListingComponent},
  {path : '', component : HomeComponent},
  {path : 'property-details', component : PDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
