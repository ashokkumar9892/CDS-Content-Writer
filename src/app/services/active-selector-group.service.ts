import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ActiveSelectorGroupService {
  obj: any;
  dispatcher: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  get() {
    return this.obj;
  }

  set(item) {
    this.obj = item;
    this.dispatcher.next(item); //broadcast the event that the data has updated.
  }

}
