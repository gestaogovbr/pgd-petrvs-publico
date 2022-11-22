import { Component, ElementRef, EventEmitter, HostBinding, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { UtilService } from 'src/app/services/util.service';
import { InputBase, LabelPosition } from '../input-base';

@Component({
  selector: 'input-timer',
  templateUrl: './input-timer.component.html',
  styleUrls: ['./input-timer.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputTimerComponent extends InputBase implements OnInit {
  @HostBinding('class') class = 'form-group';
  @ViewChild('inputElement') inputElement?: ElementRef;
  @Output() change = new EventEmitter<Event>();
  @Input() hostClass: string = ""; 
  @Input() labelPosition: LabelPosition = "top";
  @Input() controlName: string | null = null;
  @Input() disabled?: string;
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() labelInfo: string = "";
  @Input() bold: boolean = false;
  @Input() value: any;
  @Input() onlyHours?: string; 
  @Input() onlyDays?: string; 
  @Input() loading: boolean = false;
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() set control(value: AbstractControl | undefined) {
    this._control = value;
  }
  get control(): AbstractControl | undefined {
    return this.getControl();
  }
  @Input() set hoursPerDay(value: number) {
    this._hoursPerDay = value;
    this.updateForm(this.value);
    this.cdRef.detectChanges();
  };
  get hoursPerDay(): number {
    return this._hoursPerDay;
  }
  @Input() set size(value: number) {
    this.setSize(value); 
  }
  get size(): number {
    return this.getSize(); 
  }

  public util: UtilService;
  public fh: FormHelperService;
  public formDropdown: FormGroup;

  private _hoursPerDay: number = 24;

  constructor(public injector: Injector) {
    super(injector);
    this.util = injector.get<UtilService>(UtilService);
    this.fh = injector.get<FormHelperService>(FormHelperService);
    this.formDropdown = this.fh.FormBuilder({
      days: {default: 0},
      hours: {default: 0},
      minutes: {default: 0}
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if(this.control) {
      const controlChange = (newValue: any) => {
        this.updateValue(newValue);
        this.updateForm(newValue);
      };
      this.control.valueChanges.subscribe(controlChange);
      controlChange(this.control.value);
    }
    this.formDropdown.valueChanges.subscribe(valueChanged => {
      const form = valueChanged; //this.formDropdown.value;
      const newValue = (form.days * this.hoursPerDay) + form.hours + Math.round(form.minutes*(100/60))/100;
      this.updateValue(Math.max(newValue, 0));
    });
  }

  public get isOnlyHours(): boolean {
    return this.onlyHours !== undefined;
  }

  public get isOnlyDays(): boolean {
    return this.onlyDays !== undefined;
  }

  public getDaysInHours() {
    const days = this.formDropdown.controls.days.value;
    return days ? days * this.hoursPerDay + " horas" : " - Nenhum - ";
  }

  public updateValue(value: number | undefined) {
    if(this.value != value) {
      this.value = value;
      if(this.control && this.control.value != value) {
        this.control.setValue(value, { emitEvent: false });
      }
      if(this.change) this.change.emit(new Event("change"));
      this.cdRef.detectChanges();
    }
  }

  public updateForm(value: number | undefined) {
    const newValue = value ? this.util.decimalToTimer(value, this.isOnlyHours, this.hoursPerDay) : {
      days: 0,
      hours: 0,
      minutes: 0
    };
    const formValue = {
      days: this.formDropdown.controls.days.value,
      hours: this.formDropdown.controls.hours.value,
      minutes: this.formDropdown.controls.minutes.value
    };
    if(JSON.stringify(formValue) != JSON.stringify(newValue)) this.formDropdown.patchValue(newValue, { emitEvent: false });
  }

  public getButtonText(): string {
    return this.value != undefined ? this.util.decimalToTimerFormated(this.value, this.isOnlyHours, this.hoursPerDay) : " - Vazio - ";
  } 
}

