import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private temp = undefined
  private source = new BehaviorSubject(this.temp);
  private data = this.source.asObservable();
  constructor(private http : HttpClient) { }

  authenticateUser (user) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/user/authenticate-user', user, {headers : headers})
  }

  nextUser (user) {
    this.source.next(user);
  }

  getData() {
    return this.data;
  }
}
