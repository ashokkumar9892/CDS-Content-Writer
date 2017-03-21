import {Component, OnInit} from '@angular/core';
import {NgFor} from '@angular/common';
import {Experiment} from '../common/experiment.model';
import {EntityDefinitionService} from '../service/entityDefinitionService';
import {Rules} from '../model/rules.model';

@Component({
  selector: 'my-app',
  template: require('./serviceTest.component'),
  providers: [EntityDefinitionService]


})

export class ServiceTestComponent implements OnInit {
  title: string = 'Service Test Page';
  body: string = 'This is the about Service body';
  public rules : Rules[];
  rule : Rules;

  constructor(private entitydefinitionservice: EntityDefinitionService) { }
  ngOnInit() {

    alert('data');
    // this.entitydefinitionservice.getApplicationSettings('0123').subscribe(rule =>
    // {
    //   alert('data');
    //   alert(rule);
    //
    // });

  }


}
