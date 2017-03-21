import { Component, OnInit } from '@angular/core';
import { SelectedRecommendationService } from '../services/selected-recommendation.service';

import { RecommendationsWithDetailsService } from '../services/recommendations-with-details.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
  providers: [RecommendationsWithDetailsService]
})
export class RecommendationsComponent implements OnInit {

  recommendations: any[];
  errObj: any;


  testArray: any;

  constructor(private recService: RecommendationsWithDetailsService, private selectedRecommendationService: SelectedRecommendationService) {

    var i = 0;
    this.testArray = [];

    for (i = 0; i < 50; i++) {
      this.testArray.push("Recommendation " + i);
    }

  }


  ngOnInit() {

    this.recService.getAllRecommendations().subscribe(
        (data) => { this.recommendations = data; },
        (err) => { this.errObj = err;}

    );

  }

  setRecommendation(item) {
  //  this.selectedRecommendationService.set(item);
  }

}
