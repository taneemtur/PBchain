import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PropertyService } from 'src/app/services/property.service';
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

   user : any;

  offeredAmount : Number;
  constructor(
    private router : Router,
    private propertyService : PropertyService,
    private loginService : LoginService
    ) { 
    this.propertyDetails = this.router.getCurrentNavigation().extras.state.propertyDetails;
  }

  ngOnInit(): void {
    this.loginService.getData()
      .subscribe(user => {
        this.user = user;
      })
  }

  placeBuyRequest () {
    let req = {
      amount : this.offeredAmount,
      propertyId : this.propertyDetails.propertyId,
      userId : this.user.userId
    }

    this.propertyService.placeBuyRequest(req)
     .subscribe(res => {
       if(res.success) {
         console.log(res)
       }
       else {
         console.log(res)
       }
     })
  }



}
