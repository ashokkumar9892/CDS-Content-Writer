import {Component, OnInit, ViewChild, Input, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-list-builder',
  templateUrl: './list-builder.component.html',
  styleUrls: ['./list-builder.component.scss']
})
export class ListBuilderComponent implements OnInit, AfterViewInit {

  cfg: any;
  items: any;
  choices: any;
  optionsMenuStyle: any;
  searchStr: string;
  filteredChoices: any;
  componentUid: string;
  shouldAutoClose: boolean;
  @ViewChild('searchInputBox') searchInputBox;
  @ViewChild('optionsMenu') optionsMenu;

  @Input('showListOnFocus') _showListOnFocus: boolean = true;
  @Input('allowFilter') _allowFilter: boolean = true;
  @Input('mustPickFromList') _mustPickFromList: boolean = true;
  @Input('addLinkText') _addLinkText: string = "Add. . .";

  ngAfterViewInit() {

    new Tether({
      element: this.optionsMenu.nativeElement,
      target: this.searchInputBox.nativeElement,
      attachment: 'bottom left',
      targetAttachment: 'bottom left'
    });

  }
  ngOnInit() {


    //configuration options
    //TODO: need to add in option for the list data
    this.cfg = {
      showListOnFocus: this._showListOnFocus ,  //whether to show the options menu immediately on focus/click. if allowFilter is false, then this is forced to be true.
      allowFilter: this._allowFilter ,  //if true, clicking on the 'add' box/button will focus a text box for searching. if false, then the 'add' acts as a menu button.
      mustPickFromList: this._mustPickFromList ,  //can arbitrary text be added?
      addLinkText: this._addLinkText
    };


    //console.log(this.cfg);

    //if not allowing filter, then must show list on focus/click
    this.cfg.showListOnFocus = this.cfg.allowFilter ? this.cfg.showListOnFocus : true;


  }


  getOffset(el) {
      el = el.getBoundingClientRect();
      return {
        left: el.left + window.scrollX,
        top: el.top + window.scrollY,
        width: el.offsetWidth,
        height: el.offsetHeight
      };
  }

  //TODO: should be a general util function
  generateUUID() {
      //super-compact solution from http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0;
        var v = (c == 'x') ? r : (r&0x3|0x8);
        return  v.toString(16);
      });
  };

  constructor() {

    this.componentUid = this.generateUUID();
    this.items = [];
    this.filteredChoices = [];
    this.optionsMenuStyle = {"display":"none",top: "150px", left: "50px" };
    this.shouldAutoClose = true;


    //just a dummy list for now
    this.choices = [
      {
        "name": "Fry, Flynn J."
      },
      {
        "name": "Campos, Barry S."
      },
      {
        "name": "Bond, Celeste M."
      },
      {
        "name": "Buck, Jessica J."
      },
      {
        "name": "Woodard, Stella Z."
      },
      {
        "name": "Clayton, Aurelia D."
      },
      {
        "name": "Good, Sheila J."
      },
      {
        "name": "Morin, Kenyon Z."
      },
      {
        "name": "Doyle, Dean K."
      },
      {
        "name": "Mcfadden, Tanner Z."
      },
      {
        "name": "Griffith, Prescott I."
      },
      {
        "name": "Mercado, Tiger I."
      },
      {
        "name": "Massey, Camden S."
      },
      {
        "name": "Williamson, Frances A."
      },
      {
        "name": "Ruiz, Dante O."
      },
      {
        "name": "Gates, Louis P."
      },
      {
        "name": "Gilbert, Renee Y."
      },
      {
        "name": "Ferrell, Aspen W."
      },
      {
        "name": "Harmon, Ashton M."
      },
      {
        "name": "Bowen, Hilda M."
      },
      {
        "name": "Owen, Rhiannon O."
      },
      {
        "name": "Nichols, Cally S."
      },
      {
        "name": "Maynard, Cora U."
      },
      {
        "name": "Hunter, Anne G."
      },
      {
        "name": "Velasquez, Ignacia O."
      }

    ];


    this.filteredChoices = [];

    //clone choices array
    for (let item of this.choices) {
      this.filteredChoices.push(item);

    }

  }

  positionMenu() {

 //   var elPos = this.getOffset(this.searchInputBox.nativeElement);
 //   this.optionsMenuStyle.top = (this.searchInputBox.nativeElement.offsetTop + this.searchInputBox.nativeElement.offsetHeight + 3 ) + "px";
  //  this.optionsMenuStyle.left = this.searchInputBox.nativeElement.offsetLeft + "px";
 //   this.optionsMenuStyle.minWidth = (this.searchInputBox.nativeElement.offsetWidth - 5) + "px";
 //   this.optionsMenuStyle.top = (elPos.top + elPos.height) + "px";
 //   this.optionsMenuStyle.left = elPos.left + "px";


    //have to call each time because tether doesn't take into account the changing search box pos as list grows.
    new Tether({
      element: this.optionsMenu.nativeElement,
      target: this.searchInputBox.nativeElement,
      attachment: 'bottom left',
      targetAttachment: 'bottom left'

    });

  }

  //ensure the options list is reflective of the search string.
  syncList() {

      //not ideal performance with this, but does keep the component self contained, without using a pipe
      this.filteredChoices = [];

      if (this.searchStr) {
        for (let item of this.choices) {
          if (item.name.toLowerCase().indexOf(this.searchStr.toLowerCase()) > -1) {
            this.filteredChoices.push(item);
          }
        }
      } else {
        //clone choices array
        for (let item of this.choices) {
          this.filteredChoices.push(item);

        }
      }

  }


  onSearchBoxFocus(evt) {

    //console.log(evt);

    this.shouldAutoClose = true;

    if (evt.target.nodeName.toLowerCase() == "input") {
      evt.target.style.cursor = "text";
    }

    this.showSelectionMenu();

  }


  onSearchBoxBlur(evt) {

    var me = this;
   // console.log("blurred");
   // console.log(evt);
   // console.log(me.shouldAutoClose);

    if (evt.target.nodeName.toLowerCase() == "input") {
      evt.target.style.cursor = "pointer";
    }

    setTimeout(function() { if (me.shouldAutoClose) { me.hideSelectionMenu(); } }, 10);
  }


  onSearchBoxKeyed(item, evt) {

  //  console.log(evt);

    if (evt.keyCode == 13) {
      this.addTask(evt.target.value);
      this.searchStr = "";

    } else {
      this.syncList();

    }

    this.showSelectionMenu();
  }

  onOptionMouseDown(evt) {

    //if mouse down on an option, don't allow the blur event to close the menu.
    this.shouldAutoClose = false;

  }



  showSelectionMenu() {

    if (this.cfg.showListOnFocus) {
      this.syncList();
      this.optionsMenuStyle.display = "absolute";
      this.positionMenu();
    }

  }

  hideSelectionMenu() {
    this.optionsMenuStyle.display = "none";
    this.searchStr = "";
  }

  toggleSelectionMenu() {

    if (this.optionsMenuStyle.display == "none") {
      this.showSelectionMenu();
    } else {
      this.hideSelectionMenu();
    }

  }


  addTask(item) {


    //TODO: this is just dummy data structure.
    this.items.push({
      "label" : item,
      "completed" : false,
      "author" : "me",
      "assignedTo" : "me"
    });

    this.hideSelectionMenu();
    // this.searchInputBox.nativeElement.focus();

    this.positionMenu();

    this.shouldAutoClose = true;

  }


  deleteTask(idx) {
    this.items.splice(idx, 1);
  }
}
