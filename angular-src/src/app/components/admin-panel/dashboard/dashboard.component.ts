import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private registerService : RegisterService,
    private _snackBar : MatSnackBar,
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

        }
      })
  }

  rejectReq (el) {

  }

  propertyDetails (el) {

  }

  acceptFeatureReq (el) {}

  rejectFeatureReq (el) {}
}
