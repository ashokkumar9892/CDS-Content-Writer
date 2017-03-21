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
export class TriggersService {

  constructor(private http: Http) { }


  getTriggers(): Observable<any[]> {
    return this.http.get("assets/data/triggers.json")
        .map( (resp: Response) => { return resp.json() || []; } )
        .catch((err: any) => {  console.log("error in ValueSetsService"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );
  }

}
