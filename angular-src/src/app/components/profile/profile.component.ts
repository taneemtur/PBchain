import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/userInterface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user  = {
    name : "usr1",
    email : "usr1@pbchain.com",
    pnum : 123456789,
    userType : "Real Estate Agent",
  }

  constructor() { }

  ngOnInit(): void {
  }

}
