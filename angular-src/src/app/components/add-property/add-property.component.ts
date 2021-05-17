import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  cities = ["NONE","KARACHI", "LAHORE", "HYDERABAD", "ISLAMABAD"];
  propertyTypes = ['Flat', 'Commercial', 'Home', 'Portion', 'Room'];
  selectedPropertyType : string;
  selectedCity : string;
  location : string;
  purpose : string;
  description : string;
  area : number;
  price : number;
  washroom : number;
  extraRooms : number;
  bedroom : number;
  address : string;

  user : any

  constructor(
    private propertyService : PropertyService,
    private _snackBar : MatSnackBar,
    private router : Router, 
    private loginService : LoginService
    ) { }

  ngOnInit(): void {
    this.loginService.getData()
      .subscribe(user => {
        this.user = user
      })
  }

  onSubmit() {
    let propertyData = {
      propertyType : this.selectedPropertyType,
    propertyCity : this.selectedCity,
    propertyLocation : this.location,
    propertyBedrooms : this.bedroom,
    propertyWashrooms : this.washroom,
    propertyPurpose : this.purpose,
    propertyCost : this.price,
    propertyArea : this.area,
    propertyDescription : this.description,
    propertyAddress : this.address,
    propertyTotalRooms : this.bedroom + this.extraRooms,
    userId : this.user.userId
    }

    this.propertyService.addProperty(propertyData)
    .subscribe(res => {
      console.log(res)
      if(res.success) {
        this._snackBar.open("Successfully added property.", "", {
          duration: 2000,
        });
    
        this.router.navigate(['/listing'])
      }
      else { 
        this._snackBar.open("Failed to add property.", "", {
          duration: 2000,
        });
      }
    })
  }

}
