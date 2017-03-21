import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';

import { routing, appRoutingProviders } from './app.routing';

import { SelectorGroupComponent } from './selector-group/selector-group.component';
import { HomeComponent } from './home/home.component';



import { RecommendationsComponent } from './recommendations/recommendations.component';

import { SelectedRecommendationService } from './services/selected-recommendation.service';

import { ContentProgramsComponent } from './content-programs/content-programs.component';
import { ActiveSelectorGroupService } from './services/active-selector-group.service';
import { TemplatesComponent } from './templates/templates.component';
import {RulesRouteComponent} from "./rules/rules.component";
import {HubComponent} from "./hubs/hubs.component";
// import {ServiceTestComponent} from "./serviceTest/serviceTest.component"


@NgModule({
  declarations: [
      AppComponent,
      SelectorGroupComponent,
      HomeComponent,
      RecommendationsComponent,
      ContentProgramsComponent,
      TemplatesComponent,
      RulesRouteComponent,
    HubComponent



  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      routing,
      NgbModule.forRoot()
  ],
  providers: [appRoutingProviders, SelectedRecommendationService, ActiveSelectorGroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
