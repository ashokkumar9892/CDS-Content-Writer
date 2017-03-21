import {Component, OnInit} from '@angular/core';
import { EntityDefinitionService  } from '../service/entityDefinition.service';
import { NotificationService  } from '../service/notification.service';
import {configSettingsService} from "../common/configSettings";
import {ApplicationSetting} from "../model/applicationsetting.model";


@Component({
  selector: 'my-app',
  template: require('./rules.component.html'),
  providers: [EntityDefinitionService,configSettingsService,NotificationService ]


})
export class RulesRouteComponent implements OnInit {

  title: string = 'Rules Page';
  body: string = 'This is the about rules body';
  appsetting: ApplicationSetting[];

  appsettings: any[];
  metricalhir :any[];
  notificationData :any[];
  notificationcount :any[];
  errObj: any;
  public arrayOfKeys;


  constructor(private entityService: EntityDefinitionService,
              private notificationservice: NotificationService)
  {
  }




  ngOnInit() {

    // all 10 service same with getter
    this.entityService.getType('GetMetricHierarchyCategories').subscribe(
      (data) => {
        this.metricalhir = data;
        console.log('getApplicationSettings Result'+ data);
      },
      (err) => { this.errObj = err;}

    );


    this.entityService.getApplicationSettings('0123').subscribe(
      (data) => {
        this.appsetting = data;
        console.log('getApplicationSettings Result'+ this.appsetting);
      },
      (err) => { this.errObj = err;}

    );


    this.notificationservice.getNotificationCount().subscribe(
      (data) => {
        this.notificationcount = data;
        console.log('notificationservice Result'+ data);
      },
      (err) => { this.errObj = err;}

    );


    this.notificationservice.getNotifications().subscribe(
      (data) => {
        this.notificationData = data;
        console.log('notificationservice Result'+ data);
      },
      (err) => { this.errObj = err;}

    );




  }


}



