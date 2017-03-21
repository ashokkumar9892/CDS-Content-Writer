/**
 * Created by A779806 on 3/10/2017.
 */
import { Injectable,  OnInit } from '@angular/core';
import {Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http'
import {configSettingsService} from "../common/configSettings";

import {ApplicationSetting} from "../model/applicationsetting.model";

//simple service to hold the entityDefinitionService object.
@Injectable()
export class EntityDefinitionService   {

  headers: any;
  errObj: any;
  options = new RequestOptions({headers: this.headers});


  //serviceBase = '../CDSContentEditorApi/api/EntityDefinition/';
  serviceBase = 'http://localhost/CDSContentEditorApi/api/EntityDefinition/';

  constructor(private $http: Http , configservice: configSettingsService) {
    this.headers = configservice.getHeader();
    this.options = new RequestOptions({headers: this.headers});
    console.log('re headers Result:' + this.headers);
  }


  getApplicationSettings( clientid: string  ): Observable<ApplicationSetting[]> {

    this.options.search  = new URLSearchParams('clientId=' + clientid);

    return this.$http.get(this.serviceBase +'getApplicationSettings', this.options)
      .map( (resp: Response) => { return resp.json() || []; } )
      .catch( (err: any) => { console.log("Error in getApplicationSettings"); console.log(err); return err;  } )
      ;


  };


  // getApplicationSettingsTest( clientid: string  ): Observable<any[]> {
  //
  //   alert('getApplicationSettings');
  //   //var result = this.configSettings.headers;
  //   //Test Code to set config value here
  //   ///sessionStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIxNTE5OTc4IiwiVXNlck5hbWUiOiJhc2hva3AiLCJJbnN0YWxsYXRpb25JRCI6IjAxMjMiLCJIYXNBY2Nlc3NUb0FsbFByb3ZpZGVycyI6IkZhbHNlIiwiUm9sZXMiOiJBZG1pbmlzdHJhdG9yLERpcmVjdG9yLFByb3ZpZGVyLFJ1bGUgQWRtaW5pc3RyYXRvcixSdWxlIEF1dGhvciIsIlByb3ZpZGVycyI6IiIsIm5iZiI6MTQ4OTY3NTM1OCwiZXhwIjoxNDg5NzYxNzU4LCJpYXQiOjE0ODk2NzUwNTgsImlzcyI6ImFsbHNjcmlwdHMuY29tIiwiYXVkIjoiQWxsc2NyaXB0c0NsaWVudHMifQ.v-sDLdk0Kv9gaEdS8RsQs4AQ9dhlNOys1oXoaly9O94');
  //   var jwt = sessionStorage.getItem("token");
  //   let headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});
  //   if(jwt) {
  //     // headers.append('Authorization', 'Bearer ' + jwt);
  //     headers.append('Authorization' , jwt);
  //   }
  //   //headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIxNTE5OTc4IiwiVXNlck5hbWUiOiJhc2hva3AiLCJJbnN0YWxsYXRpb25JRCI6IjAxMjMiLCJIYXNBY2Nlc3NUb0FsbFByb3ZpZGVycyI6IkZhbHNlIiwiUm9sZXMiOiJBZG1pbmlzdHJhdG9yLERpcmVjdG9yLFByb3ZpZGVyLFJ1bGUgQWRtaW5pc3RyYXRvcixSdWxlIEF1dGhvciIsIlByb3ZpZGVycyI6IiIsIm5iZiI6MTQ4OTU5NTg2NywiZXhwIjoxNDg5NjgyMjY3LCJpYXQiOjE0ODk1OTU1NjcsImlzcyI6ImFsbHNjcmlwdHMuY29tIiwiYXVkIjoiQWxsc2NyaXB0c0NsaWVudHMifQ.vL3q3P0rB0Fc9rpjSCCsp7xO9YJE3imzo8yUPrO_Ae0');
  //   headers.append('User-Agent',  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36');
  //   // headers.append('Accept-Encoding',  'gzip, deflate, sdch, br');
  //   // headers.append('Accept-Language',  'en-US,en;q=0.8');
  //   // headers.append('Cookie',  'ASP.NET_SessionId=lq0n3u4to1mpp5ajhasq504f');
  //
  //   //headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIxNTE5OTc4IiwiVXNlck5hbWUiOiJhc2hva3AiLCJJbnN0YWxsYXRpb25JRCI6IjAxMjMiLCJIYXNBY2Nlc3NUb0FsbFByb3ZpZGVycyI6IkZhbHNlIiwiUm9sZXMiOiJBZG1pbmlzdHJhdG9yLERpcmVjdG9yLFByb3ZpZGVyLFJ1bGUgQWRtaW5pc3RyYXRvcixSdWxlIEF1dGhvciIsIlByb3ZpZGVycyI6IiIsIm5iZiI6MTQ4OTUyNDI5OCwiZXhwIjoxNDg5NjEwNjk4LCJpYXQiOjE0ODk1MjM5OTgsImlzcyI6ImFsbHNjcmlwdHMuY29tIiwiYXVkIjoiQWxsc2NyaXB0c0NsaWVudHMifQ.DAvhgNxOC1LewCPw5J1MH1OQnYEb7dn3EMNNWwizLBE');
  //   headers.append('Access-Control-Allow-Origin','*');
  //   //var result = this.config.getHeaders();
  //   let options = new RequestOptions({headers: headers});
  //   options.search  = new URLSearchParams('clientId=' + clientid);
  //   // let options = new RequestOptions({headers: this.confighelper.headers});
  //   //let options = new RequestOptions({headers: this.configsettings.headers});
  //
  //   return this.$http.get(this.serviceBase +'GetApplicationSettings', options)
  //     .map( (resp: Response) => { return resp.json() || []; } )
  //     .catch( (err: any) => { console.log("Error in getApplicationSettings"); console.log(err); return err;  } )
  //     ;
  //
  //
  //
  //
  // }


  createDataTypeCode(name : string, label: string, entitydatatypecodeId: string) {

    this.options.search  = new URLSearchParams('name=' + name + "&" + 'id=' + 0 + 'label=' + label + 'entityDataTypeCodeId=' + entitydatatypecodeId);

    return this.$http.post(this.serviceBase + 'CreateDataTypeCode', this.options)
    // ...and calling .json() on the response to return data
      .map( (resp: Response) => { return resp.json() || []; } )
      //...errors if any
      .catch((err: any) => {  console.log("error in createDataTypeCode"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );


  };


  setDataTypeCode( id: string, name: string, label: string, entitydatatypecodeId: string)  {

    this.options.search  = new URLSearchParams('name=' + name + "&" + 'id=' + 0 + 'label=' + label + 'entityDataTypeCodeId=' + entitydatatypecodeId);

    return this.$http.post(this.serviceBase + 'SetDataTypeCode', {  id: id, name: name, label: label, entitydatatypecodeId: entitydatatypecodeId })
    // ...and calling .json() on the response to return data
      .map( (resp: Response) => { return resp.json() || []; } )
      //...errors if any
      .catch((err: any) => {  console.log("error in setDataTypeCode"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );


  };


  deleteDataTypeCode( id: string, entitydatatypecodeid: string) {

    this.options.search  = new URLSearchParams('name=' + name + "&" + 'id=' + 0 + 'entityDataTypeCodeId=' + entitydatatypecodeid);
    return this.$http.post(this.serviceBase + 'DeleteDataTypeCode',  this.options)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      //...errors if any
      .catch((err: any) => {  console.log("error in deleteDataTypeCode"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );


  };


  getType( getter: string): Observable<any[]> {

    return this.$http.get(this.serviceBase + getter,  this.options)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      //...errors if any
      .catch((err: any) => {  console.log("error in getType"); console.log(`${err.message}; ${err.status}, ${err.statusText}`); return err; } );


  };




}

