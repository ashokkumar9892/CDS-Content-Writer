/**
 * Created by A779806 on 3/20/2017.
 */


import { Injectable,  OnInit } from '@angular/core';
import {Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http'
import {configSettingsService} from "../common/configSettings";

import {ApplicationSetting} from "../model/applicationsetting.model";

//simple service to hold the entityDefinitionService object.
@Injectable()
export class WorkSpace   {

  headers: any;
  workspaces: any[];
  activeWorkspaceId: 0;
  options = new RequestOptions({headers: this.headers});


  //serviceBase = '../CDSContentEditorApi/api/EntityDefinition/';
  serviceBase = 'http://localhost/CDSContentEditorApi/api/';

  constructor(private $http: Http , configservice: configSettingsService) {
    this.headers = configservice.getHeader();
    this.options = new RequestOptions({headers: this.headers});
    console.log('re headers Result:' + this.headers);
  }


  getWorkspace( id: string  ): Observable<any[]> {

    let workspaces = this.workspaces;
    for (let i = 0; i < workspaces.length; i++) {
      let workspace = workspaces[i];
      if (workspace.data.id === id) {
        return workspace;
      }
    }


  };


  getActiveWorkspace( ): Observable<any[]> {

    if (this.activeWorkspaceId) {
      return this.getWorkspace(this.activeWorkspaceId);
    } else {
      return null;
    }


  };


  // replaceActiveWorkspace( data: string  ) {
  //
  //   let ws = this.getActiveWorkspace();
  //   if (ws) {
  //     this.replaceWorkspace(ws.data.id, data);
  //   }
  // };


  replaceWorkspace  (data : any,id: string) {
    let ws = this.getWorkspace(id);
    if (ws) {
      this.updateWorkspaceProperties(ws, data);
      this.activeWorkspaceId = data.id;
      // $rootScope.$broadcast('workspaceReplaced', id, ws);
    }
  };


  updateWorkspaceProperties  (data : any,ws: any) {
    for (var p in data) {
      if (data.hasOwnProperty(p)) {
        ws.data[p] = data[p];
      }
    }
  };


  onStorableUpdated  (result : any) {
    let ws = this.getWorkspace(result.data.id);
    if (ws) {
      this.updateWorkspaceProperties(ws, result.data);
    }
  };







}


