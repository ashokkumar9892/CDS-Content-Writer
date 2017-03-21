import {
  Component,
  OnInit
} from '@angular/core';

import {
  Broadcaster
} from '../common/Broadcaster';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'clock-component',
  templateUrl: ('./hubs.component.html'),
  providers: [
    Broadcaster
  ]



})
export class HubComponent implements OnInit {

  private contentEditorHubApi: any;

  private _eventBus: Subject<BroadcastEvent>;

  private proxy: any;

  request : [{
    KnowledgeModuleId :9,
    targetEngine  :   "gfe"
  }];

  hubid = "9728ed18-afc7-4bb5-af4d-3add258777ee";

  constructor(private broadcaster: Broadcaster) {


    $.connection.contentEditorHub.connection.url = 'http://localhost/CDSContentEditorApi/signalr/reconnect?transport=serverSentEvents&messageId=d-EAD149F9-A%2C0%7CK%2C0%7CL%2C1%7CM%2C0&clientProtocol=1.4&Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIxNTE5OTc4IiwiVXNlck5hbWUiOiJhc2hva3AiLCJJbnN0YWxsYXRpb25JRCI6IjAxMjMiLCJIYXNBY2Nlc3NUb0FsbFByb3ZpZGVycyI6IkZhbHNlIiwiUm9sZXMiOiJBZG1pbmlzdHJhdG9yLERpcmVjdG9yLFByb3ZpZGVyLFJ1bGUgQWRtaW5pc3RyYXRvcixSdWxlIEF1dGhvciIsIlByb3ZpZGVycyI6IiIsIm5iZiI6MTQ5MDEwMTk0MywiZXhwIjoxNDkwMTg4MzQzLCJpYXQiOjE0OTAxMDE2NDMsImlzcyI6ImFsbHNjcmlwdHMuY29tIiwiYXVkIjoiQWxsc2NyaXB0c0NsaWVudHMifQ.Bb6UXxKATa8pm5uzNjTAXVTrgvGGzmgFqx7FSOkBofU&connectionToken=PIxsiND5z7Oi9DdC6mLf%2FNkhjQjC5KTur%2FHWzmTr2uqZiJ682ysGgk2TeEOI5njD0sGYFJkrAC9IwaF8Smo3CKsDRl9wAA9oFJYRz0G0AUGdGdN8R1uCUbavRmZb4NpE&connectionData=%5B%7B%22name%22%3A%22contenteditorhub%22%7D%5D&tid=4';
    this.contentEditorHubApi = $.connection.contentEditorHub;

    $.connection.hub.start().done();


  }




  Execute(executeRequest, storableType, storableId) {
  try {
    if (storableType === 'km') {
      this.contentEditorHubApi.server.compileKM(this.request, this.hubid).done(function (req) {
        //delete retrying[storableId];
        this.contentEditorHubApi.contentEditor.client.updateKMCompilationRequest(req);
      });
    }
    if (storableType === 'tc') {
      this.contentEditorHubApi.server.executeTestCase(this.request,this.hubid).done(function (req) {
        //delete retrying[storableId];
        this.contentEditorHubApi.client.updateTCExecutionRequest(req);
      });
    }
    if (storableType === 'cp') {
      this.contentEditorHubApi.server.publishProgram(this.request, this.hubid).done(function (req) {
        //delete retrying[storableId];
        this.contentEditorHubApi.client.updateCPPublishRequest(req);
      });
    }

  } catch (e) {
      console.log(e);
  }
}
  ngOnInit() {

    this.contentEditorHubApi.client.updateKMCompilationRequest = function (request) {
      if (request.Status < 2) {

        //this.broadcast.broadcast("kmCompilationRunning", request.KnowledgeModuleId);
         //$rootScope.$broadcast('kmCompilationRunning', request.KnowledgeModuleId);
      } else {
        this.broadcast.broadcast("kmCompilationStopped", request.KnowledgeModuleId);
         //$rootScope.$broadcast('kmCompilationStopped', request.KnowledgeModuleId);
      }
     // updateRequest(request);
    }


    this.contentEditorHubApi.client.updateTCExecutionRequest = function (request) {
       if (request.Status < 2) {
          // $rootScope.$broadcast('tcExecutionRunning', request.TestCaseId);
       } else {
          // $rootScope.$broadcast('tcExecutionStopped', request.TestCaseId, request.Status );
       }
       //updateRequest(request);
    }

    this.contentEditorHubApi.client.updateCPPublishRequest = function (request) {
       if (request.Status < 2) {
         //  $rootScope.$broadcast('publishRequestRunning', request.ProgramId);
       } else {
           if (request.Status === 7)
           {
              // $rootScope.$broadcast('forbidden');
           }
          // $rootScope.$broadcast('publishRequestStopped', request);
       }
       //updateRequest(request);
    }

    //this.execute();

    let request = { "KnowledgeModuleId": 9, "targetEngine": "gef" };
    this.contentEditorHubApi.server.compileKM(request, this.hubid).done(function (req) {
      // this.contentEditorHubApi.server.compileKM(this.executeRequest, $.connection.hub.id).done(function (req) {

      this.contentEditorHubApi.client.updateKMCompilationRequest(req);
    });

  }



  setWorkingAttribute(idx) {

    try {
      console.log("working attribute; " + idx);
      alert('compile test case');
      this.broadcaster.broadcast('kmCompilationRunning', '11');

      let request = { "KnowledgeModuleId": 9, "targetEngine": "gef" };
      this.contentEditorHubApi.server.compileKM(request, this.hubid).done(function (req) {
        // this.contentEditorHubApi.server.compileKM(this.executeRequest, $.connection.hub.id).done(function (req) {

        this.contentEditorHubApi.client.updateKMCompilationRequest(req);
      });
    }catch (e)
    {
      console.log(e);
    }
  }
}


interface BroadcastEvent {
  key: any;
  data?: any;
}



