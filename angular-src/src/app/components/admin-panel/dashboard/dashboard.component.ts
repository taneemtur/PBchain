import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

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
    private registerService : RegisterService
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
