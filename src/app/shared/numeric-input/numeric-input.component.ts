/** Exports the NumericInput Component */

import {
    Component,
    Input,
    AfterViewInit
} from '@angular/core';


//items needed for using ngModel
import { forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
const noop = () => {};
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NumericInputComponent),
  multi: true
};



@Component({
  moduleId: "999", //module.id,
  selector: 'numeric-input',
  templateUrl: 'numeric-input.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['./numeric-input.component.scss']
})

export class NumericInputComponent implements  ControlValueAccessor, AfterViewInit {


  cmpValue: number;
  @Input() max: number;  //FIXME: for some reason, the incoming max value is not set/assign to the variable.
  @Input() min: number;
  @Input() textBoxEditing: boolean;
  @Input() incrementBy: number;

  cmpGroupClasses: any;
  valueIsValid: boolean;
  rollingIntervalObj: any;
  rollingTimeoutObj: any;
  rollingChangeInProgress: boolean;
  errMsg: string;
  fieldLabel: string;
  mainInputStyle: any;

  //Placeholders for the callbacks which are later provided by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;


  //public methods
  constructor() {
    //  this.valueChange = new EventEmitter<any>();

    this.cmpValue = 0;
    this.rollingChangeInProgress = false;
    this.textBoxEditing = true;
    this.min = Number.MAX_VALUE * -1;
    this.max = Number.MAX_VALUE;
    this.cmpGroupClasses = { 'form-group': true, 'has-danger': false };
    this.fieldLabel = '';
    this.incrementBy = 1;
    this.valueIsValid = true;

    this.value = 0; //note the getters and setters for this variable below.
    let maxStr = this.max + '';

    //dynamcially set the input width based on an algorithm of 10 pixels per character, up to a max of 75px.
    this.mainInputStyle = {'max-width': Math.min(maxStr.length * 10, 150) + 'px'};

  }



  //get accessor for 'value'
  get value(): number {
    return this.cmpValue;
  };

  //set accessor including call the onchange callback
  set value(v: number) {


    //ensure it is numeric, and not a string.
    v = +v;
    if (isNaN(v)) { v = 0; }

    console.log("in setValue, after: " + v);

    this.valueIsValid = (this.cmpValue <= this.max) && (this.cmpValue >= this.min);
    this.cmpGroupClasses['has-danger'] = !this.valueIsValid; //NOTE: has-danger is a bootstrap class

    if (v !== this.cmpValue) {
      this.cmpValue = v;
      this.onChangeCallback(v);
    }
  }



  /** This lifecycle hook method is called once by Angular after Angular initializes the component's
   * views and child views; after the first ngAfterContentChecked */
  ngAfterViewInit() {

    let displayMax = Intl.NumberFormat().format(this.max);
    let displayMin = Intl.NumberFormat().format(this.min);

    this.errMsg = `The value must be between ${displayMin} and ${displayMax}`;

    if ((this.min === Number.MAX_VALUE * -1) && (this.max < Number.MAX_VALUE)) {
      //formats this.max in the default locale with default options (for USA adds commas per thousand)

      this.errMsg = `The value must be less than ${displayMax}`;
    }

    if ((this.min > Number.MAX_VALUE * -1) && (this.max = Number.MAX_VALUE)) {

      this.errMsg = `The value must be greater than ${displayMin}`;
    }

  }



  incrVal() {

    this.cmpValue = +this.cmpValue;


    this.cmpValue += +this.incrementBy;
    this.value = this.cmpValue;
    this.onChangeCallback(this.cmpValue);

    console.log("incrval " + this.cmpValue);

    if (this.cmpValue > this.max) { this.cmpValue = this.max; this.value = this.cmpValue; this.stopRollingChange(); }
    //if (!this.textBoxEditing) { this.ngDoCheck(); }

    //  this.valueChange.emit(this.cmpValue);
    // console.log(">>>>>>>>> this.value " + this.value);


  }

  decrVal() {

    this.cmpValue = +this.cmpValue;

    this.cmpValue -= +this.incrementBy;
    this.value = this.cmpValue;
    if (this.cmpValue < this.min) { this.cmpValue = this.min; this.value = this.cmpValue; this.stopRollingChange(); }

    this.onChangeCallback(this.cmpValue);

  }

  startRollingChange(doIncrement: boolean) {
    let me = this;

    //stop any existing time events
    this.stopRollingChange();

    //start rolling after a short delay
    if (!this.rollingChangeInProgress) {
      this.rollingTimeoutObj = setTimeout(
          function () {
            me.rollingIntervalObj = window.setInterval
            (function () {
                  doIncrement ? me.incrVal() : me.decrVal();
                },
                120
            );
          },
          400
      );
    }

    this.rollingChangeInProgress = true;
  }


  stopRollingChange() {
    this.rollingChangeInProgress = false;
    window.clearInterval(this.rollingIntervalObj);
    window.clearTimeout(this.rollingTimeoutObj);

  }


  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.cmpValue) {
      this.cmpValue = +value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {

    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }


}
