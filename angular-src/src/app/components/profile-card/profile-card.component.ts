import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  @Input()
  ProfileDetails = undefined

  agencyCity : String;
  agencyName : String;
  pNum : Number;
  agencyEmail : String;
  proPosted : Number;
  agencyAdd : String;

  testProfile = {
    agencyName : "ABC Real Estate Agency",
    agencyCity : "Karachi",
    pNum : 1234567890,
    agencyEmail : "abc@realestate.com",
    proPosted : 100,
    agencyAdd : "Office # 10, Shahra-e-Faisal, Karachi"
  }

  constructor() { }

  ngOnInit(): void {
    if (this.ProfileDetails == undefined) {
      this.agencyName = this.testProfile.agencyName;
      this.agencyCity = this.testProfile.agencyCity;
      this.agencyEmail = this.testProfile.agencyEmail;
      this.pNum = this.testProfile.pNum;
      this.proPosted = this.testProfile.proPosted;
      this.agencyAdd = this.testProfile.agencyAdd;
    }
    else { 
      this.agencyName = this.ProfileDetails.agencyName;
      this.agencyCity = this.ProfileDetails.agencyCity;
      this.agencyEmail = this.ProfileDetails.agencyEmail;
      this.pNum = this.ProfileDetails.pNum;
      this.proPosted = this.ProfileDetails.proPosted;
      this.agencyAdd = this.ProfileDetails.agencyAdd;
    }
  }

}
