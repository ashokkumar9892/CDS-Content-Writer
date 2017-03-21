/**
 * Created by A779806 on 3/10/2017.
 */

import {Injectable} from '@angular/core';
import {UserData} from '../model/userData.model';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {configSettingsService} from "../common/configSettings";
import {EntityDefinitionService} from "../service/entityDefinition.service";
import {Observable } from 'rxjs/Observable';

@Injectable()

export class AuthenticationService {

  headers: any;
  errObj: any;
  options = new RequestOptions({headers: this.headers});

  //serviceBase = '../CDSContentEditorApi/api/EntityDefinition/';
  serviceBase = 'http://localhost/CDSContentEditorApi/api/EntityDefinition/';

  entityservice : EntityDefinitionService;

  constructor(private $http: Http, private configservice: configSettingsService, private entityService: EntityDefinitionService) {
    this.headers = configservice.getHeader();
    this.options = new RequestOptions({headers: this.headers});
    this.entityservice = entityService;
    console.log('re headers Result:' + this.headers);
  }



  clearAuth(loggedin: string, userdata: UserData)   {

    this.entityservice.getApplicationSettings(userdata.installationId).subscribe(
      (data) => {

        console.log('getApplicationSettings Result'+ data);
      },
      (err) => { this.errObj = err;}

    );

  };


  changeAuth(loggedin: string, userdata: UserData): Observable<any[]>  {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.$http.get(this.serviceBase +'GetApplicationSettings', this.options)
      .map( (resp: Response) => { return resp.json() || []; } )
      .catch( (err: any) => { console.log("Error in getApplicationSettings"); console.log(err); return err;  } )
      ;



  };



}
