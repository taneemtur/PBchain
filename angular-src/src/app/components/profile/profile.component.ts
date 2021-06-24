import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/userInterface';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PropertyService } from 'src/app/services/property.service';
import { is } from 'sequelize/types/lib/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WalletService } from 'src/app/services/wallet.service';

// { name: "aa", email: "aa", pnum: 122, password: "gKsDbnMP4W6pdKN" }

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = undefined
  reqs : any[];
  userProperties : any[];


  displayedColumns: string[] = ['id', 'from', 'forProperty', 'amount', 'status', 'accept', 'reject'];
  displayedColumns1: string[] = ['id', 'from', 'forProperty', 'amount', 'status', 'accept', 'reject'];
  displayedColumns2: string[] = ['id', 'propertyId', 'owner', 'rentPerMonth', 'securityDeposit', 'rentedOn', 'rentDueDate', 'payRent'];
  displayedColumns3: string[] = ['id', 'propertyId', 'tenant', 'rentPerMonth', 'securityDeposit', 'rentedOn', 'rentDueDate'];
  dataSource = [];
  dataSource1 = [];
  dataSource2 = [];
  dataSource3 = [];

  waiting : boolean = false;

  balance : Number;
  depositAmount : Number;
  transferTo : string;
  transferAmount : Number;
  withdrawAmount : Number;

  constructor(
    private router : Router, 
    private loginService : LoginService,
    private propertyService : PropertyService,
    private walletService : WalletService,
    private _snackBar : MatSnackBar,
    ) { 
  }

  ngOnInit(): void {
    this.loginService.getData()
      .subscribe(user => {
        if (user) {
          this.user = user;
        }
        else {
          this.router.navigate(['/login']);
        }
      })

    this.getBuyRequests();
    this.getUserProperties();
    this.getClientAccBalance();
    this.getRentRequests();
    this.getRentedProperties();
    this.getPropertiesOnRent();
  }

  progreassBar () {
    if(!this.waiting) {
      this.waiting = true
    }
    else { 
      this.waiting = false
    }
  }

  acceptOffer(element) {
    this.progreassBar();
    this.propertyService.transferProperty(element.propertyPropertyId, element.userUserId, element.amount)
      .subscribe(res => {
        this.progreassBar();
        if(res.success) {
          this._snackBar.open(res.msg, "", {
            duration: 2000,
          });

          this.getBuyRequests();
          this.getUserProperties();
          this.getClientAccBalance()
        }        
      })
  }

  acceptRentOffer (el) {
    let data = {
      id : el.id,
      propertyId : el.propertyId,
      tenant : el.userId,
      owner : this.user.userId,
      amount : el.amount
    }

    this.progreassBar();

    this.propertyService.acceptRentOffer(data)
      .subscribe(res => {
        this.progreassBar();
        console.log(res)
        if(res.success) {
          this._snackBar.open(res.msg, "", {
            duration: 2000,
          });
          this.getRentRequests();
          this.getClientAccBalance();
          this.getPropertiesOnRent();
        }
      })
  }

  getBuyRequests() {
    this.propertyService.getUserBuyRequests(this.user.userId)
      .subscribe(res => {
        console.log(res)
        if(res.success) {
          this.reqs = res.reqs;
          this.dataSource = this.reqs
          console.log(this.reqs)
        }
      })
  }

  getRentRequests () {
    this.propertyService.getRentReqs(this.user.userId)
      .subscribe(res => {
        console.log(res);
        if(res.success) {
          this.dataSource1 = res.reqs;
        }
      })
  }

  getUserProperties() {
    this.propertyService.getUserProperties(this.user.userId)
      .subscribe(res => {
        console.log(res)
        this.userProperties = res.properties
      })
  }

  getRentedProperties () {
    this.propertyService.getRentedProperties(this.user.userId)
      .subscribe(res => {
        console.log(res)
        if(res.success) {
          this.dataSource2 = res.properties;
        }
      })
  }

  getPropertiesOnRent () {
    this.propertyService.getPropertiesOnRent(this.user.userId)
      .subscribe(res => {
        console.log(res)
        if(res.success) {
          this.dataSource3 = res.properties;
        }
      })
  }

  payRent (e) {
    let propertyId = e.propertyId;
    this.propertyService.payPropertyRent(propertyId)
      .subscribe(res => {
        console.log(res);
        if(res.success) {
          this._snackBar.open(res.msg, "", {
            duration: 2000,
          });

          this.getClientAccBalance();
          this.getRentedProperties();
          
        }
        else {
          this._snackBar.open(res.msg, "", {
            duration: 2000,
          });
        }
      })
  }

  getClientAccBalance() {
  let balance = 0;
  this.walletService.getAccountBalance(this.user.email)
  .then(bal => {
    bal.subscribe(data => {
      console.log(data);
      this.balance = data;
      this._snackBar.open("Successfully got account balance", "", {
        duration: 2000,
      });
    });
  })
  .catch(err => {
    console.log(err);
    this._snackBar.open("Failed to get account balance.", "", {
      duration: 2000,
    });

  })
    
  }

  deposit () {
    this.walletService.depositAmount(this.user.email, this.depositAmount)
      .subscribe(res => {
        console.log(res);
        if(res.success) {
          this._snackBar.open(res.msg, "", {
            duration: 2000,
          });

          this.walletService.balanceUpdate(res.balance)
        }
        else {
          this._snackBar.open(res.msg, "", {
            duration: 2000,
          });
        }
      })
  }

  transfer() {
    this.walletService.transferAmount(this.user.email, this.transferTo, this.transferAmount)
      .subscribe(res => {
        console.log(res);
        if(res.success) {
          this._snackBar.open(res.msg, "", {
            duration: 2000,
          });

          this.walletService.balanceUpdate(res.balance)
        }
        else {
          this._snackBar.open(res.msg, "", {
            duration: 2000,
          });
        }
      })
  }

  withdraw () {
    this.walletService.withdrawAmount(this.user.email, this.withdrawAmount)
    .subscribe(res => {
      console.log(res);
      if(res.success) {
        this._snackBar.open(res.msg, "", {
          duration: 2000,
        });

        this.walletService.balanceUpdate(res.balance)
      }
      else {
        this._snackBar.open(res.msg, "", {
          duration: 2000,
        });
      }
    })    
  }

}
