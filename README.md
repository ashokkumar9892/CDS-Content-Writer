# CDS Content Editor UX Designs

UI designs and implementation for the CDS Content Editor Redesign effort.


##Relevant Notes

- The flow chart diagram code is located in the `RecommendationFlowComponent` component in `src/app/recommendation-flow`.  The flow diagram is created dynamically from json data. The method `prepareRecData` transforms the raw data, adding in the layout positioning information for each of the nodes.  I realize that the data coming from the CDS service will be differently formatted than mine, but I'm sure that just a few modifications would be needed.
- The component flow for drilling into a recommendation is `AppComponent -> RecommendationsComponent -> RecommendationsDetailComponent -> RecommendationFlowComponent`
- The starting page of the application is AppComponent, located at `src/app.component.ts`
- The data services are all located in `src/app/services`
- The styling is all done in SASS (scss specifically, see [http://sass-lang.com/](http://sass-lang.com/)), and the style sheet for each component is located in the same directory as the component.  Global styles will be located in `src/styles.scss`


-------------------------------
(This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.15.)