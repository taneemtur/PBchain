import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : String;
  password : String;
  userTypes = ["Indivisual", "Agent"]
  userType : String;

  constructor(private _snackBar : MatSnackBar, private router : Router, private loginService : LoginService) { }

  ngOnInit(): void {
  }

  onSubmit () {
    let data = {
      email : this.email,
      password : this.password
    }

    if(this.userType == "Indivisual") {
      this.loginService.authenticateUser(data)
      .subscribe(res => {
        console.log(res)
        if(res.success) {
          this._snackBar.open("Successfully Logged In.", "", {
            duration: 2000,
          });

          this.loginService.nextUser(res.user);
          this.router.navigate(['/profile'], { state : { user : res.user}})
        }
        else {
          this._snackBar.open("Failed to Log In.", "", {
            duration: 2000,
          });
        }
      })
    }
    else {

    }

    
  }

}
