import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  userBaseUrl = 'http://localhost:3000/user'

  constructor(private http : HttpClient) { }

  registerUser (user) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.userBaseUrl+'/register-user', user, {headers : headers})
  }

  registerAgency(data) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/agency/add-agency', data, {headers : headers})
  }

  registerDeveloper (data) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/developer/add-developer', data, {headers : headers})
  }
}
