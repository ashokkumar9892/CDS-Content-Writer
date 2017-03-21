import { TestBed, inject } from '@angular/core/testing';
import { ActiveSelectorGroupService } from './active-selector-group.service';

describe('ActiveSelectorGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveSelectorGroupService]
    });
  });

  it('should ...', inject([ActiveSelectorGroupService], (service: ActiveSelectorGroupService) => {
    expect(service).toBeTruthy();
  }));
});
