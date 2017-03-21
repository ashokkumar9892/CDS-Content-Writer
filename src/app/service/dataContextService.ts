/**
 * Created by A779806 on 3/10/2017.
 */
import { Injectable,  OnInit } from '@angular/core';
import {Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http'
import {configSettingsService} from "../common/configSettings";


//simple service to hold the entityDefinitionService object.
@Injectable()
export class DataContextService  {

  headers: any;
  errObj: any;
  options = new RequestOptions({headers: this.headers});

  //serviceBase = '../CDSContentEditorApi/api/EntityDefinition/';
  serviceBase = 'http://localhost/CDSContentEditorApi/api/EntityDefinition/';

  constructor(private $http: Http ,private selectedRecommendationService: configSettingsService) {
    this.headers = selectedRecommendationService.getHeader();
    this.options = new RequestOptions({headers: this.headers});
    console.log('re headers Result:' + this.headers);
  }




  getRecommendation(id: string): Observable<any[]> {

    return this.$http.get("./data/maa.json")
      .map( (resp: Response) => { return resp.json() || []; } )
      .catch( (err: any) => { console.log("Error in RecommendationsWithDetailsService; getRecommendation"); console.log(err); return err;  } )
      ;

  }

}

