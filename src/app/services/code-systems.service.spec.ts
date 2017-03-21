/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CodeSystemsService } from './code-systems.service';

describe('Service: CodeSystems', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeSystemsService]
    });
  });

  it('should ...', inject([CodeSystemsService], (service: CodeSystemsService) => {
    expect(service).toBeTruthy();
  }));
});
