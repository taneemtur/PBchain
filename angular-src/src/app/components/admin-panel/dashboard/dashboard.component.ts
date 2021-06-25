import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataSource : any[];
  dataSource1 : any[];
  displayedColumns : string[] = ['id', 'orgName', 'orgCity', 'orgEmail', 'orgNum', 'status', 'accept', 'reject']
  displayedColumns1: string[] = ['id', 'propertyId', 'owner', 'ownerEmail', 'status', 'details', 'accept', 'reject']

  propertyId : String;

  constructor(
    private registerService : RegisterService,
    private _snackBar : MatSnackBar,
    private propertyService : PropertyService
  ) { }

  ngOnInit(): void {
    this.registerReqs();
  }

  registerReqs() {
    this.registerService.getRegisterReqs()
      .subscribe(res => {
        console.log(res);
        if (res.success) {
          this.dataSource = res.reqs;
        }
      })
  }

  acceptReq (el) {
    let data = {
      orgEmail : el.orgEmail
    }

    this.registerService.registerOrg(data)
      .subscribe(res => {
        console.log(res)
        if(res.success) {
          this._snackBar.open(res.msg, "", {
            duration: 2000,
          });
          el.status = 'Accepted'
          this.registerReqs()
        }
        else {
          this._snackBar.open(res.msg, "", {
            duration: 2000,
          });

          
        }
      })
  }

  rejectReq (el) {
    el.status = 'Rejected'
  }

  propertyDetails (el) {

  }

  acceptFeatureReq (el) {}

  rejectFeatureReq (el) {}

  deleteProperty () {
    let pId = this.propertyId;
    this.propertyService.deleteProperty(pId)
      .subscribe(res => {
        console.log(res) 
        if(res.success) {
          this._snackBar.open(res.msg, "", {
            duration: 2000,
          });
        }
        else {
          this._snackBar.open(res.msg, "", {
            duration: 2000,
          });
        }
      })
  }
}
