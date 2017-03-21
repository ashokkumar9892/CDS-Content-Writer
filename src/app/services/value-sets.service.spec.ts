/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ValueSetsService } from './value-sets.service';

describe('Service: ValueSets', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueSetsService]
    });
  });

  it('should ...', inject([ValueSetsService], (service: ValueSetsService) => {
    expect(service).toBeTruthy();
  }));
});
