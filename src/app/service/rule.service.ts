/**
 * Created by A779806 on 3/9/2017.
 */

import {Injectable} from '@angular/core';
import {Rules} from '../model/rules.model';
import {RULES} from "../data/rule-data";

@Injectable()
export class RuleService {
  getRules(){
    return Promise.resolve(RULES);
  }
}
