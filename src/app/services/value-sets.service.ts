import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


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
export class ValueSetsService {

  constructor(private http: Http) { }


  getTestValueSets(): Observable<any[]> {
    return this.http.get("assets/data/value-sets-2.json")
        .map( (resp: Response) => { return resp.json() || []; } )
        .catch((err: any) => {  console.log("error in getTestValueSets"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );
  }

  getRecentValueSets(): Observable<any[]> {
    return this.http.get("assets/data/recent-value-sets.json")
        .map( (resp: Response) => { return resp.json() || []; } )
        .catch((err: any) => {  console.log("error in getRecentValueSets"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );
  }


  searchCQMValueSets(searchString: string): Observable<any[]> {
    return this.http.get("/api/valuesets/cqm/search/name/" + searchString)
        .map( (resp: Response) => { return resp.json() || []; } )
        .catch((err: any) => {  console.log("error in searchCQMValueSets"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );
  }


  searchNLMValueSets(searchString: string): Observable<any[]> {
    return this.http.get("assets/data/nlm-valueset-search-results.json") //"/api/valuesets/nlm/search/name/" + searchString
        .map( (resp: Response) => { return resp.json() || []; } )
        .catch((err: any) => {  console.log("error in searchNLMValueSets"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );
  }

  getSetContentsByName(setName: string): Observable<any[]> {

    return this.http.get("/api/valuesets/getcontents/name/" + setName)
        .map( (resp: Response) => { return resp.json() || []; } )
        .catch((err: any) => {  console.log("error in getSetContentsByName"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );

  }

  getSetContentsByOid(setOid: string): Observable<any[]> {

    return this.http.get("/api/valuesets/getcontents/oid/" + setOid)
        .map( (resp: Response) => { return resp.json() || []; } )
        .catch((err: any) => {  console.log("error in getSetContentsByOid"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );

  }


}
