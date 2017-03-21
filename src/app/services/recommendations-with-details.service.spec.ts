import { TestBed, inject } from '@angular/core/testing';
import { RecommendationsWithDetailsService } from './recommendations-with-details.service';

describe('RecommendationsWithDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecommendationsWithDetailsService]
    });
  });

  it('should ...', inject([RecommendationsWithDetailsService], (service: RecommendationsWithDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
