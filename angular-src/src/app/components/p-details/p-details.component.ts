import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PropertyService } from 'src/app/services/property.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    public dialog: MatDialog,
    private router : Router,
    private propertyService : PropertyService,
    private loginService : LoginService,
    private _snackBar : MatSnackBar,
    ) { 
    this.propertyDetails = this.router.getCurrentNavigation().extras.state.propertyDetails;
  }

  ngOnInit(): void {
    this.loginService.getData()
      .subscribe(user => {
        this.user = user;
      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDailog, {
      width: '400px',
      data : this.offeredAmount
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.offeredAmount = result;
      this.placeBuyRequest();
    });
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
        this._snackBar.open(res.msg, "", {
          duration: 2000,
        });
         console.log(res)
       }
       else {
         console.log(res)
       }
     })
  }

  placeRentRequest () {
    let req = {
      amount : this.offeredAmount,
      propertyId : this.propertyDetails.propertyId,
      userId : this.user.userId
    }

    this.propertyService.placeRentRequest(req)
     .subscribe(res => {
       if(res.success) {
        this._snackBar.open(res.msg, "", {
          duration: 2000,
        });
         console.log(res, "rent")
       }
       else {
         console.log(res)
       }
     })
  }



}


@Component({
  selector: 'confirm-dailog',
  templateUrl: './confirm-dailog.html',
})
export class ConfirmDailog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDailog>,
    @Inject(MAT_DIALOG_DATA) public data: Number) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}