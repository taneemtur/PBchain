import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-org-signup',
  templateUrl: './org-signup.component.html',
  styleUrls: ['./org-signup.component.css']
})
export class OrgSignupComponent implements OnInit {

  constructor() { }

  orgName : string;
  orgEmail : string;
  orgNum : Number;
  orgAddress : string;
  orgCity : string;
  password : string;

  ngOnInit(): void {
  }

  onSubmitAgency() {

  }

  onSubmitDeveloper() {

  }

}
