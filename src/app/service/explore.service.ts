/**
 * Created by A779806 on 3/10/2017.
 */
import { Injectable,  OnInit } from '@angular/core';
import {Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http'
import {configSettingsService} from "../common/configSettings";


//simple service to hold the entityDefinitionService object.
@Injectable()
export class ExploreService  {

  headers: any;
  errObj: any;
  options = new RequestOptions({headers: this.headers});

  //serviceBase = '../CDSContentEditorApi/api/EntityDefinition/';
  serviceBase = 'http://localhost/CDSContentEditorApi/api/';
  configurl="";

  constructor(private $http: Http ,private configservice: configSettingsService) {
    this.headers = configservice.getHeader();
    this.options = new RequestOptions({headers: this.headers});
    console.log('re headers Result:' + this.headers);
  }


  createStorable(input: string): Observable<any[]> {

    this.options.search  = new URLSearchParams('data=' + JSON.stringify(input));
    return this.$http.post(this.serviceBase + this.configurl,  this.options)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      //...errors if any
      .catch((err: any) => {  console.log("error in createStorable"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );


  };


  deleteStorable(input: string): Observable<any[]> {

    this.options.search  = new URLSearchParams('data=' + JSON.stringify(input));
    return this.$http.delete(this.serviceBase + this.configurl,  this.options)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      //...errors if any
      .catch((err: any) => {  console.log("error in createStorable"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );


  };


  getStorable( input: string): Observable<any[]> {

    return this.$http.get(this.serviceBase + this.configurl,  this.options)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      //...errors if any
      .catch((err: any) => {  console.log("error in getType"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );


  };

}

