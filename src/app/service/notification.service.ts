/**
 * Created by A779806 on 3/15/2017.
 */
/**
 * Created by A779806 on 3/10/2017.
 */
import { Injectable,  OnInit } from '@angular/core';
import {Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http'
import {configSettingsService} from "../common/configSettings";


//simple service to hold the entityDefinitionService object.
@Injectable()
export class NotificationService  {

  headers: any;
  errObj: any;
  options = new RequestOptions({headers: this.headers});

  //serviceBase = '../CDSContentEditorApi/api/EntityDefinition/';
  serviceBase = 'http://localhost/CDSContentEditorApi/api/Notification/';
  configurl="";

  constructor(private $http: Http ,private configservice: configSettingsService) {
    this.headers = configservice.getHeader();
    this.options = new RequestOptions({headers: this.headers});
    console.log('re headers Result:' + this.headers);
  }


  getNotifications(): Observable<any[]> {

    return this.$http.get(this.serviceBase + 'GetATPNotifications',  this.options)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      //...errors if any
      .catch((err: any) => {  console.log("error in getNotifications"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );


  };


  getNotificationCount(): Observable<any[]> {

    return this.$http.get(this.serviceBase + 'GetNotificationCount',  this.options)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      //...errors if any
      .catch((err: any) => {  console.log("error in GetNotificationCount"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );


  };


  deleteNotification(input: string): Observable<any[]> {

    return this.$http.delete(this.serviceBase + 'GetNotificationCount',  this.options)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      //...errors if any
      .catch((err: any) => {  console.log("error in deleteNotification"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );


  };


  addNotification(input: string): Observable<any[]> {

    return this.$http.post(this.serviceBase + 'CreateNotification',  this.options)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      //...errors if any
      .catch((err: any) => {  console.log("error in deleteNotification"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );


  };




}

