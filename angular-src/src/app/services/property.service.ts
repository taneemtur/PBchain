import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  baseUrl : 'http://localhost:3000/property';
  constructor(private http : HttpClient) { }

  getPropertyByType (propertyType) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<any>(this.baseUrl+'/find-by-type', {
      headers : headers,
      params : {
        type : propertyType
      }
    })
  }
}
