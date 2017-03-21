
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent} from './home/home.component';

import { RecommendationsComponent } from './recommendations/recommendations.component';
import { ContentProgramsComponent } from './content-programs/content-programs.component';

import { TemplatesComponent } from './templates/templates.component';
import { RulesRouteComponent} from './rules/rules.component';
import {HubComponent} from "./hubs/hubs.component";
// import { ServiceTestComponent} from './serviceTest/serviceTest.component';


//NOTE: you can use named router outlets in your html file, and refer to them here using the 'outlet' field with the name as the value.
//     http://blog.angular-university.io/angular2-router/
const appRoutes: Routes = [
    {path: "", redirectTo:"home", pathMatch: "full"},
    {path: "home", component: HomeComponent},

    //note that for nested paths, the empty path in the children array is to support the parent route being navigable, the parent route by itself won't be recognized.
    {path: "recommendations", component: RecommendationsComponent},



    {path: "rules", component: RulesRouteComponent},
  {path: "hubs", component: HubComponent},

//  {path: "serviceTest", component: ServiceTestComponent},

    {path: "templates", component: TemplatesComponent},

    {path: "content-programs", component: ContentProgramsComponent},

    {path: "**", redirectTo:"home"}

];



export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});

