import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-p-details',
  templateUrl: './p-details.component.html',
  styleUrls: ['./p-details.component.css']
})
export class PDetailsComponent implements OnInit {


  propertyDetails = {
    propertyAddress: "dasda",
    propertyArea: 23123,
    propertyBedrooms: 23424,
    propertyCity: "dsads",
    propertyCost: 24324,
    propertyDescription: "adsdas",
    propertyId: "DSA-1730110000",
    propertyLocation: "dasda",
    propertyPurpose: "Rent",
    propertyTotalRooms: 55847,
    propertyType: "",
    propertyWashrooms: 4234,
    realEstateAgencyAgencyId: null,
    userUserId: null
  }

  constructor(private router : Router) { 
    this.propertyDetails = this.router.getCurrentNavigation().extras.state.propertyDetails;
  }

  ngOnInit(): void {
    
  }

}
