/**
 * Created by A779806 on 3/9/2017.
 */

import {Injectable} from '@angular/core';
import {Editor} from '../model/editor.model';

@Injectable()
export class EditorService {
  private editor: Editor[] = [
    {name: 'Content Editor 1', description: 'This is an editor1' ,counter:0},
    {name: 'Content Editor 2', description: 'This is an editor2',counter:0},
    {name: 'Content Editor 3', description: 'This is an editor3',counter:0},
    {name: 'Content Editor 4', description: 'This is an editor4',counter:0}
  ];

  getEditors(): Editor[] {
    return this.editor;
  };
}

