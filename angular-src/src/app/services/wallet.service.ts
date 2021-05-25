import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private temp = undefined;
  private source = new BehaviorSubject(this.temp);
  private data = this.source.asObservable();

  constructor(private http : HttpClient) { }

  depositAmount (userEmail, amount) {
    let data = {
      email : userEmail,
      amount : amount
    }

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/wallet/deposit', data, {headers : headers})
  }

  withdrawAmount (userEmail, amount) {
    let data = {
      email : userEmail,
      amount : amount
    }

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/wallet/withdraw', data, {headers : headers})
  }

  transferAmount (userEmail, toEmail, amount) {
    let data = {
      email : userEmail,
      toEmail : toEmail,
      amount : amount
    }

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/wallet/transfer', data, {headers : headers})
  }

  async getAccountBalance(userEmail) {
    console.log(userEmail)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const res = await this.http.get<any>('http://localhost:3000/wallet/account-balance/'+userEmail, {headers : headers}).toPromise();
    console.log(res)
    if (res.success) {
      console.log()
      this.balanceUpdate(res.balance);
      return this.data;
    }
    else {
      throw new Error("Failed to get wallet balance");
    }
  }

  getAccountBalanceHistory (userId) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>('http://localhost:3000/wallet/account-balance-history/'+userId, {headers : headers});
  }

  balanceUpdate (balance) {
    this.source.next(balance);
  }
}
