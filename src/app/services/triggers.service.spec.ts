/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TriggersService } from './triggers.service';

describe('Service: Triggers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TriggersService]
    });
  });

  it('should ...', inject([TriggersService], (service: TriggersService) => {
    expect(service).toBeTruthy();
  }));
});
