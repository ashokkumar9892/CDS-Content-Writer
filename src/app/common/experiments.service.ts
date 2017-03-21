import {Injectable} from '@angular/core';
import {Experiment} from './experiment.model';

@Injectable()
export class ExperimentsService {
  private experiments: Experiment[] = [
    {name: 'Content Editor 1', description: 'This is an editor1', completed:0},
    {name: 'Content Editor 2', description: 'This is an editor2', completed:0},
    {name: 'Content Editor 3', description: 'This is an editor3', completed:0},
    {name: 'Content Editor 4', description: 'This is an editor4', completed:0}
  ];


  getExperiments(): Experiment[] {
    return this.experiments;

  };
}
