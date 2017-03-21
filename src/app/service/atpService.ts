/**
 * Created by A779806 on 3/13/2017.
 */



import {Injectable} from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {configSettingsService} from "../common/configSettings";
import {Observable } from 'rxjs/Observable';


@Injectable()

export class atpService {

  headers: any;
  serviceBase = '../CDSContentEditorApi/api/ATP/';
  options = new RequestOptions({headers: this.headers});

  constructor(private $http: Http ,private selectedRecommendationService: configSettingsService) {
    this.headers = selectedRecommendationService.getHeader();
    this.options = new RequestOptions({headers: this.headers});
    console.log('re headers Result:' + this.headers);
  }



  searchAtp( searchText: string,searchType: string): Observable<any[]> {


      // Have to make a URLSearchParams with a query string
    this.options.search  = new URLSearchParams('searchText=' + searchText+ "&" + 'searchType=' + searchType) // <-----


    return this.$http.get(this.serviceBase + 'GetAtp', this.options)
      .map( (resp: Response) => { return resp.json() || []; } )
      .catch((err: any) => {  console.log("error in searchAtp"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );


  };


  SearchNLM( searchText: string): Observable<any[]> {


      // Have to make a URLSearchParams with a query string
    this.options.search  = new URLSearchParams('searchText=' + searchText) // <-----


    return this.$http.get(this.serviceBase + 'GetNLMValueSet', this.options)
      .map( (resp: Response) => { return resp.json() || []; } )
      .catch((err: any) => {  console.log("error in SearchNLM"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );


  };


  GetTermValueSets( termuid: string,valueSetName : string ): Observable<any[]> {


      // Have to make a URLSearchParams with a query string
    this.options.search  = new URLSearchParams('termuid=' + termuid+ "&" + 'valueSetName=' + valueSetName) // <-----


    return this.$http.get(this.serviceBase + 'GetTermValueSets', this.options)
      .map( (resp: Response) => { return resp.json() || []; } )
      .catch((err: any) => {  console.log("error in SearchNLM"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );


  };

  UpdateATPValueSets( termuid: string,valueSetName : string ): Observable<any[]> {

    return this.$http.get(this.serviceBase + 'UpdateATPValueSets')
      .map( (resp: Response) => { return resp.json() || []; } )
      .catch((err: any) => {  console.log("error in UpdateATPValueSets"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );


  };


}
