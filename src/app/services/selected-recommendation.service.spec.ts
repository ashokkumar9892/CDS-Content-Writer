/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SelectedRecommendationService } from './selected-recommendation.service';

describe('Service: SelectedRecommendation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedRecommendationService]
    });
  });

  it('should ...', inject([SelectedRecommendationService], (service: SelectedRecommendationService) => {
    expect(service).toBeTruthy();
  }));
});
