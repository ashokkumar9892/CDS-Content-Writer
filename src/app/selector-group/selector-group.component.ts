import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { StatusService } from '../services/status.service';
import { ValueSetsService } from '../services/value-sets.service';
import {CodeSystemsService} from "../services/code-systems.service";
import { TriggersService } from '../services/triggers.service';




@Component({
  selector: 'selector-group',
  templateUrl: './selector-group.component.html',
  styleUrls: ['selector-group.component.scss'],
  providers: [StatusService, ValueSetsService, CodeSystemsService]
})
export class SelectorGroupComponent implements OnInit, OnChanges {

  uid: string;
  workingAttributeIdx: number;
  statusItems: any[];
  errObj: any;
  recentValueSets: any;
  codeSystems: any;
  showingValueSetSearchResults: boolean;
  valueSetSearchResults: any;
  valueSetSearchStr: string;
  isValueSetSearching: boolean;
  attributeComparisions: string[];
  triggers: any;
  @Input() groupDef: any;
  activeRule: any; //activeRule will specify the id of a rule should be the only one to be displayed; if this is undefined/null, then all rules will be displayed.


  triggersHash: { [key: string]: any };
  currentTriggerOptions: any;

  constructor(private triggersDataService: TriggersService, private statusDataService: StatusService, private valueSetsService: ValueSetsService, private codeSystemsService: CodeSystemsService) {

    this.uid = this.generateUUID();


    this.triggersHash = {};

    this.attributeComparisions = ["equals", "does not equal", "is missing", "is not missing", "is in a value set"];

    this.showingValueSetSearchResults = false;

    //need this init
    this.groupDef = {
      title: "",
      groupOperator:"all",
      items: [{
      title:"",
      groupOperator: "all",
      ruleAttributes: [],
      valueSetName: [],
      groupType:{
        "id": "",
        "label": "",
        "children": []
      }}]
    };

      //TODO: maybe only subscribe to this if the user picks something that is actually status
    this.statusDataService.getStatusList().subscribe(
        (resp) => {
          this.statusItems = resp;

        },
        (err) =>{ this.errObj = err; }
    );

    this.valueSetsService.getRecentValueSets().subscribe(
        (resp) => {
           this.recentValueSets = resp;
        },
        (err) => {
          this.errObj = err;
        }

    );

    this.codeSystemsService.getCodeSystems().subscribe(
        (resp) => {
          this.codeSystems = resp;
        },
        (err) => {
          this.errObj = err;
        }


    )

  }

  ngOnInit() {

    if (this.groupDef) {
      if (this.groupDef.title == "") {
        this.groupDef.title = "new " + this.groupDef.groupType.label + " group";
      }
    }


    this.triggersDataService.getTriggers().subscribe(
        (resp) => {

          console.log("triggersDataService resp");
          console.log(resp);
          this.triggers = resp;

          for (let t of this.triggers) {
            if (t.id) { this.triggersHash[t.id] = {children: t.children, label: t.label} }
          }

          console.log("this.triggersHash");
          console.log(this.triggersHash);


        },
        (err) =>{ this.errObj = err; }
    );


    if (this.groupDef) {
      //default to showing first group/rule
      this.activeRule = this.groupDef.items[0];
    }


  }



  ngOnChanges(changes: SimpleChanges) {

    console.log("data changed");
    console.log(changes);

    //TODO: should check to see whether the desired data object has changed before blindly assigning here.
    //      but the var name isn't in the changes object
    //default to showing first group/rule
    this.activeRule = this.groupDef.items[0];

  }


  //super-compact solution for UUID generation, from http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return  v.toString(16);
    });
  };



  getTriggerLabel(id: string) {

    let result = "";

    if (id) { if (this.triggersHash) { if (this.triggersHash[id]) { result = this.triggersHash[id].label; } } }

    return result;
  }


  getTriggerOptions(id: string) {

    console.log("getTriggerOptions " + id);
    let result = [];

    if (id) { if (this.triggersHash) { if (this.triggersHash[id]) { result = this.triggersHash[id].children; } } }

    this.currentTriggerOptions = result;

    console.log(result);

    return result;

  }



  setActiveRule(item) {

    this.activeRule = item;

  }


  //individual rule shape within a recommendation.
  ruleShouldBeSelected(item) {
    return this.activeRule ? (this.activeRule.id == item.id) : false;

  }


  setGroupType(item, evt) {
    this.groupDef.groupType = item;



  }

  setGroupOperator(item, evt) {
    this.groupDef.groupOperator = item;



  }

  addRuleAttribute(item, groupIdx, evt) {

    console.log("addRuleAttribute, index " + groupIdx);
    console.log(this.groupDef);

    this.groupDef.items[groupIdx].ruleAttributes.push({field: item.label, attrType: item.dataType, comparison:"equals", attrStatus:[]});


  }

  removeRuleAttribute(idx, groupIdx) {


    this.groupDef.items[groupIdx].ruleAttributes.splice(idx, 1);
  }


  setAttributeComparision(value, evt, idx, groupIdx) {

    console.log("idx = " + idx);
    console.log("element id: " + "#attribute-comparison-" + this.workingAttributeIdx + "-" + this.uid);

    this.groupDef.items[groupIdx].ruleAttributes[this.workingAttributeIdx].comparison = value;
   // document.querySelector("#attribute-comparison-" + this.workingAttributeIdx + "-" + this.uid).classList.remove("is-visible");


  }

  //sort of a hack to keep track of which rule attribute index the user is selecting
  setWorkingAttribute(idx, evt) {

    console.log("working attribute; " + idx);
    this.workingAttributeIdx = idx;


  }

  setAttrStatus(lbl, evt, idx, statusIdx, groupIdx) {

    //seems like this event can fire with checked being undefined.
    // //I think it is fired for the label click as well as the checkbox. so need to ignore non-checkbox events.
    if (evt.target.checked == undefined) { evt.stopPropagation(); return; }

    if (evt.target.checked) {
      this.groupDef.items[groupIdx].ruleAttributes[idx].attrStatus.push(lbl);
    } else {
      this.groupDef.items[groupIdx].ruleAttributes[idx].attrStatus.splice(this.groupDef.items[groupIdx].ruleAttributes[idx].attrStatus.indexOf(lbl), 1);
    }

    evt.stopPropagation();

  }

  removeAttrStatus(idx, evt) {

    this.groupDef.ruleAttributes[idx].attrStatus.splice(idx, 1);
    evt.stopPropagation();
  }


//value set name can be more than one
  setValueSetName(name, evt, idx) {


    //seems like this event can fire with checked being undefined.
    // //I think it is fired for the label click as well as the checkbox. so need to ignore non-checkbox events.
    if (evt.target.checked == undefined) { evt.stopPropagation(); return; }

    if (evt.target.checked) {
      this.groupDef.ruleAttributes[idx].valueSetName.push(name);
    } else {
      this.groupDef.ruleAttributes[idx].valueSetName.splice(this.groupDef.ruleAttributes[idx].valueSetName.indexOf(name), 1);
    }

    evt.stopPropagation();


  }

  setCodeSystem(name, evt, idx) {

    this.groupDef.ruleAttributes[idx].codeSystem = name;


  }

  onValueSetSearchKeyed() {

    console.log("onValueSetSearchKeyed");

    this.showingValueSetSearchResults = false;
    this.isValueSetSearching = false;

  }

  onValueSetSearch() {

    this.isValueSetSearching = true;

    this.valueSetsService.searchNLMValueSets(this.valueSetSearchStr).subscribe(
        (resp) => {
          this.isValueSetSearching = false;
          this.valueSetSearchResults = resp;
          this.showingValueSetSearchResults = true;

        },
        (err) => {
          this.errObj = err;
          this.isValueSetSearching = false;
        }

    );

  }



  addGroup(item) {


    console.log("add group");
    console.log(JSON.stringify(this.groupDef));

    this.groupDef.items.push(
        {
          title: "",
          type: "condition",
          groupOperator: "all",
          ruleAttributes: [],
          groupType: item
        }
    );

  }





  /**
   * gets svg polygon points for a connector arrow
   * if you set flatEnd to true then there will not be an arrow point on the right side, just flat vertical line. Used for the end of a sequence typically
   * @returns {string}
   */
  getConnectorPoints(width, height, flatEnd) {

    // var height = 110;
    // var width = 300;
    var tipWidth = height / 3.5; //20;
    var resultPoints = [];

    resultPoints.push("0,0");
    resultPoints.push((width - tipWidth) + ",0");

    if (flatEnd) {

    } else {
      resultPoints.push(width + "," + (height / 2));
    }

    resultPoints.push((width - tipWidth) + "," + height);
    resultPoints.push("0," + height);
    resultPoints.push(tipWidth + "," + (height / 2));

    return resultPoints.join(" ");

  }


  getConnectorTranslate(width, height, index) {

    var tipWidth = height / 3.5;
    var initXPad = 20;
    return  'translate(' + ((index * (width - tipWidth)) + initXPad) + ',' +  12 + ')';

  }



}
