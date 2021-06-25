import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `JWT ${token}`)

    return this.http.post<any>('http://localhost:3000/buy/place-buy-request', req, {headers : headers})
  }

  getUserBuyRequests (userId) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `JWT ${token}`)

    return this.http.get<any>('http://localhost:3000/buy/get-buy-requests', {headers : headers})
  }

  transferProperty (propertyId, newOwner, amount) {
    console.log(propertyId, newOwner)
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `JWT ${token}`)
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

  payPropertyRent (propertyId) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `JWT ${token}`)
    let params = new HttpParams()
      .set('propertyId', propertyId)
    return this.http.get<any>('http://localhost:3000/property/pay-rent/'+propertyId, {headers : headers, params : params})
  }

  deleteProperty (propertyId) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `JWT ${token}`)

    return this.http.delete<any>('http://localhost:3000/property/delete-property/'+propertyId, {headers : headers})
  }

  featureProperty (featureData) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', `JWT ${token}`)

    return this.http.post<any>('http://localhost:3000/property/feature-property/', featureData, {headers : headers})    
  }
}
