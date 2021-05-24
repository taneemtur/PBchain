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

  placeBuyRequest (req) {
    console.log(req)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/buy/place-buy-request', req, {headers : headers})
  }

  getUserBuyRequests (userId) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>('http://localhost:3000/buy/get-buy-requests/'+userId, {headers : headers, params : {
      userId : userId
    }})
  }

  transferProperty (propertyId, newOwner, amount) {
    console.log(propertyId, newOwner)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/property/transfer-property/'+propertyId, {newOwner : newOwner, amount : amount}, {headers : headers})    
  }

  getPropertyHistory(propertyId, owner) {
    console.log(propertyId, owner)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>('http://localhost:3000/property/property-history/'+propertyId+'/'+owner, {headers : headers})
  }

  getUserProperties(userId) {
    console.log(userId)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>('http://localhost:3000/property/properties/'+userId, {headers : headers})
  }

  placeRentRequest (req) {
    console.log(req)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/rent/place-rent-request', req, {headers : headers})
  }

  getRentReqs (userId) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>('http://localhost:3000/rent/get-rent-requests/'+userId, {headers : headers});
  }

  acceptRentOffer (data) {
    console.log(data)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/property/rent-property/'+data.propertyId, data, {headers : headers})
  }
 
  getRentedProperties (tenant) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>('http://localhost:3000/property/get-rented-properties/'+tenant, {headers : headers});
  }

  getPropertiesOnRent (owner) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any>('http://localhost:3000/property/on-rent/'+owner, {headers : headers});
  }
}
