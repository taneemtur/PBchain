import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WalletService } from 'src/app/services/wallet.service';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  @Input()
  user : any;

  dataSource1 = [];
  displayedColumns1: string[] = ['txId', 'balance'];

  balance : Number;
  depositAmount : Number;
  transferTo : string;
  transferAmount : Number;
  withdrawAmount : Number;

  constructor(
    private walletService : WalletService,
    private _snackBar : MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getClientAccBalance();
    this.getTransactionHistory();
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

    getTransactionHistory() {
      this.walletService.getAccountBalanceHistory(this.user.userId)
        .subscribe(res => {
          console.log(res);
          if(res.success) {
            this.dataSource1 = res.history;
          }
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
            this.getTransactionHistory();
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
            this.getTransactionHistory();
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
          this.getTransactionHistory();
        }
        else {
          this._snackBar.open(res.msg, "", {
            duration: 2000,
          });
        }
      })    
    }
}
