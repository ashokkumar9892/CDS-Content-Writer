import { Injectable } from '@angular/core';
import {Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http'


// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class RecommendationsWithDetailsService {


  constructor(private http: Http) {

  }

  getAllRecommendations(): Observable<any[]> {

    return this.http.get("./assets/data/recommendations.json")
        .map( (resp: Response) => { return resp.json() || []; } )
        .catch( (err: any) => { console.log("Error in RecommendationsWithDetailsService"); console.log(err); return err;  } )
        ;

  }


  getRecommendation(id: string): Observable<any[]> {

    return this.http.get("./assets/data/recommendation-" + id + ".json")
        .map( (resp: Response) => { return resp.json() || []; } )
        .catch( (err: any) => { console.log("Error in RecommendationsWithDetailsService; getRecommendation"); console.log(err); return err;  } )
        ;

  }

}
