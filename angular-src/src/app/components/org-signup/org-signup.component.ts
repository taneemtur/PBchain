import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-org-signup',
  templateUrl: './org-signup.component.html',
  styleUrls: ['./org-signup.component.css']
})
export class OrgSignupComponent implements OnInit {

  constructor(
    private registerService : RegisterService
  ) { }

  orgName : string;
  orgEmail : string;
  orgNum : Number;
  orgAddress : string;
  orgCity : string;
  password : string;

  ngOnInit(): void {
  }

  onSubmitAgency() {
    let data = {
      orgName : this.orgName,
      orgEmail : this.orgEmail,
      orgNum : this.orgNum,
      orgAddress : this.orgAddress,
      orgCity : this.orgCity,
    }

    this.registerService.registerAgency(data)
      .subscribe(res => {
        console.log(res);
        if(res.success) {

        }
        else {

        }
      })
  }

  onSubmitDeveloper() {
    let data = {
      orgName : this.orgName,
      orgEmail : this.orgEmail,
      orgNum : this.orgNum,
      orgAddress : this.orgAddress,
      orgCity : this.orgCity,
    }

    this.registerService.registerDeveloper(data)
      .subscribe(res => {
        console.log(res);
        if(res.success) {

        }
        else {

        }
    })
  }

}
