import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { InputBase, LabelPosition } from '../input-base';

@Component({
  selector: 'input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputNumberComponent extends InputBase implements OnInit {
  @HostBinding('class') class = 'form-group';
  @ViewChild('inputElement') inputElement?: ElementRef;
  @Output() change = new EventEmitter<Event>();
  @Input() labelPosition: LabelPosition = "top";
  @Input() controlName: string | null = null;
  @Input() disabled?: string;
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() labelInfo: string = "";
  @Input() bold: boolean = false;
  @Input() value: any = "";
  @Input() size: number = 12;
  @Input() loading: boolean = false;
  @Input() minValue?: any;
  @Input() maxValue?: any;
  @Input() stepValue?: any;
  @Input() prefix?: string;
  @Input() sufix?: string;
  @Input() form?: FormGroup;
  @Input() allowNegative?: string;
  @Input() source?: any;
  @Input() path?: string;
  @Input() set control(value: AbstractControl | undefined) {
    this._control = value;
  }
  get control(): AbstractControl | undefined {
    return this.getControl();
  }
  @Input() set currency(value: string | undefined) {
    if(this._currency != value) {
      this._currency = value;
      if(value != undefined) {
        this.prefix = "R$";
        this.decimals = 2;
      }
    }
  };
  get currency(): string | undefined {
    return this._currency;
  }
  @Input() set decimals(value: number) {
    if(this._decimals != value) {
      this._decimals = value;
      //this.maskOptions.precision = value;
      this.maskFormat = value ? "0*.00" : ""; //"separator." + value : "";
    }
  }

  public maskFormat: string = "";
  //public maskOptions: any = { prefix: '', thousands: '.', decimal: ',', precision: 0 };
  //public maskDropSpecialCharacters: boolean = false; 
  //public maskSpecialCharacters: string[] = ["-", "/", "(", ")", ".", ":", " ", "+", ",", "@", "[", "]", '"', "'"];
  private _currency?: string;
  private _decimals: number = 0;

  constructor(public injector: Injector) {
    super(injector);
  }

  public get isAllowNegative(): boolean {
    return this.allowNegative != undefined;
  }

  public get isInteger(): boolean {
    return this._decimals == 0;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public onChange(event: Event) {
    if(this.change) this.change.emit(event); 
  }

}
