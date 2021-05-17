import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { HomeComponent } from './components/home/home.component';
import { ListingComponent } from './components/listing/listing.component';
import { LoginComponent } from './components/login/login.component';
import { PDetailsComponent } from './components/p-details/p-details.component';

import { PListingComponent } from './components/p-listing/p-listing.component'
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { OrgSignupComponent } from './components/org-signup/org-signup.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { DashboardComponent } from './components/admin-panel/dashboard/dashboard.component';
import { AdminLoginComponent } from './components/admin-panel/admin-login/admin-login.component';



const routes: Routes = [
  {path : 'add-property', component : AddPropertyComponent},
  {path : 'listing', component : ListingComponent},
  {path : '', component : HomeComponent},
  {path : 'property-details', component : PDetailsComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'login', component : LoginComponent},
  {path : 'profile', component : ProfileComponent},
  {path : 'contact', component : ContactComponent},
  {path : 'blogs', component : BlogsComponent},
  {path : 'calculator', component : CalculatorComponent},
  {path : 'org-signup', component : OrgSignupComponent},
  {path : 'admin-panel/dashboard', component : DashboardComponent},
  {path : 'admin-panel/login', component : AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
