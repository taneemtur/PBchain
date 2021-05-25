import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-org-signup',
  templateUrl: './org-signup.component.html',
  styleUrls: ['./org-signup.component.css']
})
export class OrgSignupComponent implements OnInit {

  constructor(
    private registerService : RegisterService,
    private _snackBar : MatSnackBar,
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
          this._snackBar.open(res.msg, "", {
            duration: 2000,
          });
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
          this._snackBar.open(res.msg, "", {
            duration: 2000,
          });
        }
        else {

        }
    })
  }

}
