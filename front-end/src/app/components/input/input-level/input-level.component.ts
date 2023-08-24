import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { InputBase, LabelPosition } from '../input-base';

export type InputLevelTypes = "number" | "text";
export type InputLevelItem = {
  value?: number | string | null,
  max?: number,
  min?: number,
  step?: number,
  valid: boolean
}
export type InputLevelValue = (parents: InputLevelItem[], item: InputLevelItem, children: InputLevelItem[]) => Promise<number | undefined> | number | undefined;
export type InputLevelValid = (parents: InputLevelItem[], item: InputLevelItem, children: InputLevelItem[]) => Promise<boolean> | boolean;

@Component({
  selector: 'input-level',
  templateUrl: './input-level.component.html',
  styleUrls: ['./input-level.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputLevelComponent extends InputBase implements OnInit {
  @HostBinding('class') class = 'form-group';
  @ViewChild('inputElement') inputElement?: ElementRef;
  @ViewChild('newInputLevel') newInputLevel?: ElementRef;
  @Output() change = new EventEmitter<Event>();
  @Input() hostClass: string = ""; 
  @Input() labelPosition: LabelPosition = "top";
  @Input() controlName: string | null = null;
  @Input() disabled?: string;
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() labelInfo: string = "";
  @Input() labelClass?: string;
  @Input() bold: boolean = false;
  @Input() value: any = "";
  @Input() inputWidth: number = 50;
  @Input() loading: boolean = false;
  @Input() minValue?: InputLevelValue;
  @Input() maxValue?: InputLevelValue;
  @Input() stepValue?: InputLevelValue;
  @Input() validate?: InputLevelValid;
  @Input() prefix?: string;
  @Input() sufix?: string;
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() type: InputLevelTypes = "number";
  @Input() separator: string = ".";
  @Input() required: boolean = false;
  @Input() set control(value: AbstractControl | undefined) {
    this._control = value;
  }
  get control(): AbstractControl | undefined {
    return this.getControl();
  }
  @Input() set size(value: number) {
    this.setSize(value); 
  }
  get size(): number {
    return this.getSize(); 
  }

  public levels: InputLevelItem[] = [];
  public newLevel: InputLevelItem = { valid: true };

  constructor(public injector: Injector) {
    super(injector);
  }

  public controlChange(newValue: any) {
    this.levels = (newValue || "").split(this.separator).filter((x: string) => !this.isEmpty(x)).map((x: string) => Object.assign({} as InputLevelItem, {
      value: x,
      valid: true
    }));
    this.checkValidate();
  }

  public isEmpty(value: any) {
    return [undefined, "0", "", 0].includes(value);
  }

  // public get isValid(): boolean {
  //   return !this.levels.find(x => !x.valid);
  // }

  public updateControl() {
    if(this.control) this.control.setValue(this.levels.map(x => x.value).join(this.separator));
  }

  public get hasNewLevel() {
    return true;
  }

  public checkValidate() {
    (async () => {
      for(let i = 0; i < this.levels.length; i++) {
        let parents = this.levels.slice(0, i);
        let children = this.levels.slice(i+1, this.levels.length);
        if(this.validate) this.levels[i].valid = await this.validate(parents, this.levels[i], children);
        if(this.minValue) this.levels[i].min = await this.minValue(parents, this.levels[i], children);
        if(this.maxValue) this.levels[i].max = await this.maxValue(parents, this.levels[i], children);
        if(this.stepValue) this.levels[i].step = await this.stepValue(parents, this.levels[i], children);
      }
      // if(this.control) this.control.setErrors(this.isValid ? null : {invalid: true});  
      this.cdRef.detectChanges();
    })();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if(this.control) {
      this.control.valueChanges.subscribe(this.controlChange.bind(this));
      this.controlChange(this.control.value);
    }
  }

  public onChange(event: Event, index: number) {
    this.levels[index].value = (event.target! as HTMLInputElement).value;
    if(this.isEmpty(this.levels[index].value)) this.levels = this.levels.slice(0, index);
    this.updateControl();
    //this.checkValidate();
  }

  public onNewLevelChange(event: Event) {
    this.newLevel.value = this.newInputLevel!.nativeElement.value;
    if(!this.isEmpty(this.newLevel.value)) {
      this.levels.push({ value: this.newLevel.value, valid: true });
      this.newLevel.value = "";
      this.newInputLevel!.nativeElement.value = "";
      this.updateControl();
      this.cdRef.detectChanges();
      $("#" + this.generatedId(this.controlName) + '_' + (this.levels.length-1)).focus();
    }
  }

}
