import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../../interfaces/userInterface'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name : String;
  email : String;
  password : String;
  pnum : Number;
  userType : String;

  typeDetails = {
    orgName : "",
    orgCity : "",
    orgEmail : "",
    orgAdd : "",
    orgNum : 0
  }

  userTypes = ["Indivisual", "Agent", "Developer"]

  constructor(private _snackBar : MatSnackBar, private router : Router) { }

  ngOnInit(): void {
  }

  onSubmit () {
    let data = {
      name : this.name,
      email : this.email,
      pnum : this.pnum,
      userType : this.userType,
      typeDetails : {},
      password : this.password
    }

    if(this.userType != "Indivisiual") {
      data.typeDetails = this.typeDetails
    }

    this._snackBar.open("Successfully Registered.", "", {
      duration: 2000,
    });

    console.log(data)

    this.router.navigate(['/login'])
  }

}
