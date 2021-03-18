import { Component, Input, OnInit } from '@angular/core';
import { PropertyDetails } from '../../interfaces/propertyInterface'
import { Router } from '@angular/router';

@Component({
  selector: 'app-p-listing',
  templateUrl: './p-listing.component.html',
  styleUrls: ['./p-listing.component.css']
})
export class PListingComponent implements OnInit {

  @Input()
  PDetails = undefined;

  constructor(private router : Router) { }

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

  gridColumns = 3;
  
  ngOnInit(): void {
    if(!(this.PDetails == undefined)) {
      this.propertyDetails = this.PDetails;
    }
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  seePropertyDetails() {
    this.router.navigate(['/property-details'], { state : { propertyDetails : this.propertyDetails}})
  }

}
