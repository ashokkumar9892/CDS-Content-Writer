/**
 * Created by A779806 on 3/21/2017.
 */


import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

//simple service to hold the entityDefinitionService object.
@Injectable()
export class GroupService   {

  arrayMember ;

  calcNestingLevel( root: any, parent: any , arraymember : any) : number {

    let nestingLevel = 0;
    while (parent !== root) {
      nestingLevel++;
      parent = this.findParent(root, parent, this.arrayMember);
    }
    return nestingLevel;

  };


  findParent(ancestor, child, arrayMember) :any {
  let i, item;
  for (let i = 0; i < ancestor[arrayMember].length; i++) {
    item = ancestor[arrayMember][i];
    if (child === item) {
      return ancestor;
    }
  }
  for (let i = 0; i < ancestor[arrayMember].length; i++) {
    item = ancestor[arrayMember][i];
    var parent = this.findParent(item, child, arrayMember);
    if (parent !== null) {
      return parent;
    }
  }
  return null;
}


  pruneGroups(root, parent, arrayMember) {
    let idx;
    let array = parent[arrayMember];
    if (array.length === 0) {
          // If removing an item from a group has emptied it, then delete the group from its parent
          var grandparent = this.findParent(root, parent, arrayMember);
          if (grandparent) {
            idx = grandparent[arrayMember].indexOf(parent);
            grandparent[arrayMember].splice(idx, 1);
            this.pruneGroups(root, grandparent, arrayMember);
          }
        } else if (array.length === 1) {
          // If removing an item from a group reduces it to one item, then pop the item out of the group.
          // Do this all the way up the ancestry chain of the group.
          var remaining = array[0];
          remaining.booleanOperator = parent.booleanOperator;
          var grandparent = this.findParent(root, parent, arrayMember);
          if (grandparent) {
            remaining.nestingLevel--;
            idx = grandparent[arrayMember].indexOf(parent);
            grandparent[arrayMember].splice(idx, 1, remaining);
            this.updateStateVariables(grandparent, arrayMember);
            this.pruneGroups(root, grandparent, arrayMember);
          }
          else
          {
            remaining.booleanOperator = 0;
          }
    } else {
      this.updateStateVariables(parent, arrayMember);
    }
}


  updateStateVariables(parent, arrayMember) {
  var array = parent[arrayMember];
  if (array.length > 0) {
    if (array.length > 1) {
      // If there is more than one conditional element then clear the boolean
      // operator for the first one. If there is one we don't do this because
      // this is a transient condition that exists only while pruning.
      array[0].booleanOperator = 0;
    }
    for (var i = 0; i < array.length; i++) {
      var item = array[i];
      item.canBeMovedUp = i > 0;
      item.canBeMovedDown = i < array.length - 1;
      item.isGroupable = item.canBeMovedUp;
      item.isUngroupable = i > 0 && item.nestingLevel > 0;
    }
  }
}
}
