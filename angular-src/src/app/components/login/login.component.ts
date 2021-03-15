import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : String;
  password : String;

  constructor(private _snackBar : MatSnackBar, private router : Router) { }

  ngOnInit(): void {
  }

  onSubmit () {
    let data = {
      "name" : this.email,
      "password" : this.password
    }

    this._snackBar.open("Successfully Logged In.", "", {
      duration: 2000,
    });

    console.log(data)

    this.router.navigate(['/profile'])
  }

}
