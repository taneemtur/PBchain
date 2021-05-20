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
    return this.http.post<any>('http://localhost:3000/org-signup/real-estate-agency', data, {headers : headers})
  }

  registerDeveloper (data) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/org-signup/developer', data, {headers : headers})
  }

  getRegisterReqs () {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>('http://localhost:3000/org-signup/get-all-reqs', {headers : headers})
  }

  registerOrg(data) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/org-signup/accept-req', data, {headers : headers})
  }

  getDevelopers() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>('http://localhost:3000/developer/get-developers', {headers : headers})
  }

  getAgencies() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>('http://localhost:3000/agency/get-agencies', {headers : headers})
  }
}
