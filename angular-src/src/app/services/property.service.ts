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

  addProperty (propertyData) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/property/add-property', propertyData, {headers : headers})
  }

  getAllProperties () {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>('http://localhost:3000/property/all-properties', {headers : headers})
  }
}
