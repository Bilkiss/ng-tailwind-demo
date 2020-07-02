import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  private baseUrl = 'https://test-marketplace-api.herokuapp.com/api/';
  private baseUrlLocal = 'http://localhost:4000/api/';

  public endpoints = {
    car_list: `${this.baseUrl}car/list`,
    car_by_slug: `${this.baseUrl}car/`,
    add_car: `${this.baseUrl}car/add-car`,
    property_list: `${this.baseUrl}property/list`,
    property_by_slug: `${this.baseUrl}property/`,
    add_property: `${this.baseUrl}property/add-property`,
    signin: `${this.baseUrl}user/signin`,
    register: `${this.baseUrl}user/signup`,
    image_upload: `${this.baseUrl}car/img-upload`,
  };

  constructor(
    public http: HttpClient
  ) { }


  // generic http request handler
  request(key: endpointType, method, payload?) {
    if (this.endpoints.hasOwnProperty(key)) {
      return this.http[method](this.endpoints[key], payload);
    }
    return { error: true, reason: `${method} request to ${this.endpoints[key]} was not sent` };
  }

  requestWithUrlParams(key: endpointType, method, param, payload?) {
    if (this.endpoints.hasOwnProperty(key))
      return this.http[method](this.endpoints[key] + '/' + param, payload);
    return { error: true, reason: `${method} request to ${this.endpoints[key]} was not sent` };
  }

  requestWithHeaders(key: endpointType, method, payload?) {


    const headers = new HttpHeaders({
      'Accepted-Encoding': 'application/json',
      'X-Requested-With' : 'xmlhttprequest'
    });


    if (this.endpoints.hasOwnProperty(key)) {
      let result = new HttpRequest(method, this.endpoints[key], payload, { headers : headers});
      return this.http.request(result);
    }
    // return { error: true, reason: `${method} request to ${this.endpoints[key]} was not sent` };
  }

}


export type endpointType = 'car_list' | 'car_by_slug' | 'add_car' | 'property_list' | 'property_by_slug' | 'add_property' | 'signin' | 'register' | 'image_upload';
