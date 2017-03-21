/**
 * Created by A779806 on 3/13/2017.
 */


import {Injectable} from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {configSettingsService} from "../common/configSettings";
import {Observable } from 'rxjs/Observable';


@Injectable()

export class configService {

  headers: any;
  errObj: any;
  options = new RequestOptions({headers: this.headers});

  //serviceBase = '../CDSContentEditorApi/api/EntityDefinition/';
  serviceBase = 'http://localhost/CDSContentEditorApi/api/CDSEnvironment/';

  constructor(private $http: Http ,private selectedRecommendationService: configSettingsService) {
    this.headers = selectedRecommendationService.getHeader();
    this.options = new RequestOptions({headers: this.headers});
    console.log('re headers Result:' + this.headers);
  }


  getType( getter: string): Observable<any[]> {

    return this.$http.get(this.serviceBase + getter,  this.options)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      //...errors if any
      .catch((err: any) => {  console.log("error in getType"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );


  };



}

