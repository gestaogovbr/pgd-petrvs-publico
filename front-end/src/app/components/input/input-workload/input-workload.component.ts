import { Component, ElementRef, EventEmitter, HostBinding, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { InputBase, LabelPosition } from '../input-base';

export type UnitWorkload = "day" | "week" | "mouth";

@Component({
  selector: 'input-workload',
  templateUrl: './input-workload.component.html',
  styleUrls: ['./input-workload.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputWorkloadComponent extends InputBase implements OnInit {
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
  @Input() value: any = 0;
  @Input() size: number = 0;
  @Input() loading: boolean = false;
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() maxLength?: number;
  @Input() unitChange?: (newUnit: UnitWorkload) => void;
  @Input() set unit(value: UnitWorkload) {
    if(this._unit != value) {
      this._unit = value;
      this.maxValue = this.unit == "day" ? 24 : this.unit == "week" ? 120 : 480;
      this.valueToWork();
      this.cdRef.detectChanges();
    }
  }
  get unit(): UnitWorkload {
    return this._unit;
  }
  @Input() set control(value: AbstractControl | undefined) {
    this._control = value;
  }
  get control(): AbstractControl | undefined {
    return this.getControl();
  }

  public workControl: FormControl = new FormControl();
  public maxValue: number = 24;
  private _unit: UnitWorkload = "day";

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if(this.control) {
      this.control.valueChanges.subscribe(value => this.valueToWork());
      this.valueToWork();
    }
  }

  public onButtonClick(event: Event) {
    const next: UnitWorkload = this.unit == "day" ? "week" : this.unit == "week" ? "mouth" : "day";
    console.log(this.unit, next);
    this.unit = next;
    if(this.unitChange) this.unitChange(next);
  }

  public get iconWork(): string {
    return this.unit == "day" ? "bi bi-calendar3-event" : this.unit == "week" ? "bi bi-calendar3-week" : "bi bi-calendar3";
  }

  public get unitWork(): string {
    return this.unit == "day" ? "h/dia" : this.unit == "week" ? "h/semana" : "h/mês";
  }

  public onChange(event: Event) {
    this.workToValue();
    if(this.change) this.change.emit(event); 
  }

  public valueToWork() {
    const factor = this.unit == "day" ? 1 : this.unit == "week" ? 5 : 20;
    const value = this.control ? this.control.value * factor : this.value * factor;
    if(this.workControl.value != value) this.workControl.setValue(value);
  }

  public workToValue() {
    const factor = this.unit == "day" ? 1 : this.unit == "week" ? 5 : 20;
    const value = this.workControl.value / factor;
    if(this.control) {
      if(this.control.value != value) this.control.setValue(value);
    } else {
      if(this.value != value) this.value = value;
    }
  }

}
