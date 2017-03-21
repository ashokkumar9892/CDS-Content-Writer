// import the packages
import {
  Injectable,
  EventEmitter
} from '@angular/core';
import {
  CONFIGURATION
} from '../common/app.constants';
import {
  GetClockTime
} from '../model/getclocktime';



// declare the global variables

declare var $:any;
declare var jQuery:any;


@Injectable()
export class SignalRService {
  // Declare the variables
  private proxy: any;

  private contentEditorHubApi: any;


  // create the Event Emitter


  constructor() {
    debugger;
    // Constructor initialization

    // create hub connection

   this.contentEditorHubApi= $.connection.contentEditorHub;
    $.connection.hub.start().done();
    this.contentEditorHubApi = $.connection(CONFIGURATION.baseUrls.server).hub.start();

    $.connection(CONFIGURATION.baseUrls.server).hubName = 'contentEditorHub';


    //another way to do
   this.contentEditorHubApi = $.hubConnection(CONFIGURATION.baseUrls.server);
   this.proxy = this.contentEditorHubApi.createHubProxy("contentEditorHub");

      this.contentEditorHubApi.hub.start().done();


    this.proxy.on('updateKMCompilationRequest', (data: any) => {
      console.log(data);
    });

    // another way

    this.proxy.invoke('updateKMCompilationRequest');

    // this.connection.start()
    //   .done(function () {
    //     alert('connected');
    //     console.log('connected');
    //     this.connection.send("success?");
    //   })
    //   .fail(function (a) {
    //     alert('fail');
    //     console.log('not connected'+a);
    //   });

    // create new proxy as name already given in top
    // this.proxy = this.connection('contentEditorHub');
    // // register on server events
    // this.registerOnServerEvents();
    // // call the connecion start method to start the connection to send and receive events.
    // this.startConnection();
  }
  // method to hit from client
  public sendTime() {
    // server side hub method using proxy.invoke with method name pass as param
    this.proxy.invoke('updateKMCompilationRequest');
  }
  // check in the browser console for either signalr connected or not

}

export class SignalrWindow extends Window {
  $: any;
}


