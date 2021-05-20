import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../../interfaces/userInterface'
import { RegisterService } from '../../services/register.service';

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
  agencies : any[];
  developers : any[];

  constructor(
    private _snackBar : MatSnackBar, 
    private router : Router, 
    private  registerService : RegisterService
    ) { }

  ngOnInit(): void {
    this.getOrgs()
  }

  getOrgs() {
    this.registerService.getAgencies()
      .subscribe(res => {
        console.log(res);
        if(res.success) {
          this.agencies = res.agencies;
        }
      })

    this.registerService.getDevelopers()
      .subscribe(res => {
        console.log(res);
        if(res.success) {
          this.developers = res.developers;
        }
      })
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
console.log(this.userType, data, "dasda")
    if(this.userType == "Developer") {
      
      let developer = {
        developerName : this.typeDetails.orgName,
        developerCity : this.typeDetails.orgCity,
        developerEmail : this.typeDetails.orgEmail,
        developerPnum : this.typeDetails.orgNum,
        developerAdd : this.typeDetails.orgAdd,
        agentName : this.name,
        agentEmail : this.email,
        agentPnum : this.pnum,
        password : this.password
      }

      this.registerService.registerDeveloper(developer)
      .subscribe(res => {
        console.log(res);
        if(res.success) {
          this._snackBar.open("Successfully registered developer.", "", {
            duration: 2000,
          });
      
          this.router.navigate(['/login'])
        }
        else {
          this._snackBar.open("Failed to register developer.", "", {
            duration: 2000,
          });
        }
      })
    }
    else if (this.userType == "Agent") {
      let agency = {
        agencyName : this.typeDetails.orgName,
        agencyCity : this.typeDetails.orgCity,
        agencyEmail : this.typeDetails.orgEmail,
        agencyPnum : this.typeDetails.orgNum,
        agencyAdd : this.typeDetails.orgAdd,
        agentName : this.name,
        agentEmail : this.email,
        agentPnum : this.pnum,
        password : this.password
      }

      this.registerService.registerAgency(agency)
        .subscribe(res => {
          console.log(res)
          if(res.success) {
            this._snackBar.open("Successfully Registered Agent.", "", {
              duration: 2000,
            });
        
            this.router.navigate(['/login'])
          }
          else {
            this._snackBar.open("Failed to Register Agent.", "", {
              duration: 2000,
            });
          }
        })
    }
    else {
      

      let user = {
        name : this.name,
        email : this.email,
        pnum : this.pnum,
        password : this.password,
      }
  
      console.log(user);
  
      this.registerService.registerUser(user)
        .subscribe(res => {
          if(res.success) {
            this._snackBar.open("Successfully Registered.", "", {
              duration: 2000,
            });
        
            this.router.navigate(['/login'])
          }
          else {
            this._snackBar.open("Failed to Register User.", "", {
              duration: 2000,
            });
          }
        })
    }
    
    
  }

}
