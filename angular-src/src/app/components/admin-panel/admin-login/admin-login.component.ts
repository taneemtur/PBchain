import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  email : String;
  password : String;
  userTypes = ["Indivisual", "Agent"]
  userType : String;

  constructor(
    private router : Router,
    private _snackBar : MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this._snackBar.open("Successfully logged in as admin.", "", {
      duration: 2000,
    });
    this.router.navigate(['/admin-panel/dashboard'])
  }

}
