import { Component, ElementRef, EventEmitter, HostBinding, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { InputBase, LabelPosition } from '../input-base';
import moment from 'moment';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'input-datetime',
  templateUrl: './input-datetime.component.html',
  styleUrls: ['./input-datetime.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputDatetimeComponent extends InputBase implements OnInit {
  @HostBinding('class') class = 'form-group';
  @ViewChild('inputElement') inputElement?: ElementRef;
  @ViewChild('dateInput') dateInput?: ElementRef;
  @ViewChild('timeInput') timeInput?: ElementRef;
  @Output() buttonClick = new EventEmitter<Event>();
  @Output() change = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<Event>();
  @Input() hostClass: string = ""; 
  @Input() labelPosition: LabelPosition = "top";
  @Input() controlName: string | null = null;
  @Input() disabled?: string;
  @Input() icon: string = "bi bi-calendar-date";
  @Input() label: string = "";
  @Input() labelInfo: string = "";
  @Input() labelClass?: string;
  @Input() bold: boolean = false;
  @Input() loading: boolean = false;
  @Input() prefix?: string;
  @Input() sufix?: string;
  @Input() time24hours?: string;
  @Input() noIcon?: string;
  @Input() noIndicator?: string;
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() value: any = "";
  @Input() required?: string;
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
  @Input() set date(value: string | undefined) {
    if(this._date != value) {
      this._date = value;
      this.detectChanges()
      this.updateInputs();
    }
  }
  get date(): string | undefined {
    return this._date;
  }
  @Input() set time(value: string | undefined) {
    if(this._time != value) {
      this._time = value;
      this.detectChanges()
      this.updateInputs();
    }
  }
  get time(): string | undefined {
    return this._time;
  }

  public util: UtilService;
  private _date?: string;
  private _time?: string;
  public minDate!: string;
  public maxDate!: string;

  constructor(public injector: Injector) {
    super(injector);
    this.util = injector.get<UtilService>(UtilService);
  }
  
  public get isDate(): boolean {
    return this.date !== undefined;
  }

  public get isTime(): boolean {
    return this.time !== undefined;
  }

  public get isTime24hours(): boolean {
    return this.time24hours !== undefined;
  }
  
  public get isNoIcon(): boolean {
    return this.noIcon !== undefined;
  }

  public get isNoIndicator(): boolean {
    return this.noIndicator !== undefined;
  }
  
  ngOnInit(): void {
    super.ngOnInit();
    this.minDate = (moment().subtract(100, 'years').format("YYYY-MM-DD")).toString();
    this.maxDate = (moment().add(10, 'years').format("YYYY-MM-DD")).toString();
  }

  public updateInputs() {
    if(this.viewInit) {
      if(this.dateInput) this.dateInput.nativeElement.value = this.getDateValue();
      if(this.hasTimeInput && this.timeInput) {
        this.timeInput!.nativeElement.value = this.getTimeValue();
        this.timeInput!.nativeElement.dispatchEvent(new Event("input"));
      }
      this.cdRef.detectChanges();
    }
  }

  public get hasTimeInput(): boolean {
    return !this.isDate && (this.isTime || this.isFirefox);
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if(this.control) {
      this.control.valueChanges.subscribe(newValue => {
        if(this.value != newValue) {
          this.value = newValue;
          this.updateInputs();
        }
      });
      this.value = this.control.value;
    }
    this.updateInputs();
  }

  public onChangeDateTime(event: any) {
    const strDate = this.dateInput?.nativeElement.value || "";
    const strTime = this.timeInput?.nativeElement.value || "00:00:00";
    let value = this.value; 
    try {
      //let newValue = this.isTime ? strTime : this.util.strToDate(!this.isDate && this.isFirefox ? strDate + "T" + strTime : strDate);
      value = this.isTime ? strTime : new Date(strDate + (strDate.includes("T") ? "" : "T" + strTime));
      if((this.isTime && !this.util.isTimeValid(value)) || (!this.isTime && !this.util.isDataValid(value))) {
        throw new Error("Data inválida");
      }
    } catch (e: any) {
      value = null;
    } finally {
      if(!!value != !!this.value || value?.toString() != this.value?.toString()) {
        this.value = value;
        this.control?.setValue(value, {emitEvent: false});
        if(this.change) this.change.emit(event);
        this.cdRef.detectChanges();
      }
    }
  }

  public getDateValue() {
    return !this.value || !(this.value instanceof Date) ? null : this.isFirefox || this.isDate ? moment(this.value).format("YYYY-MM-DD") : moment(this.value).format("YYYY-MM-DDTHH:mm");
  }

  public getTimeValue() {
    return !this.value ? null : this.value instanceof Date ? moment(this.value).format("HH:mm") : this.util.isTimeValid(this.value) ? this.value.substr(0, 5) : null;
  }

  public formattedDateTime(dataHora: Date, apenasData: boolean = false): string {
    apenasData = apenasData ? true : this.isDate;
    return dataHora ? moment(dataHora).format(apenasData ? "DD/MM/YYYY" : "DD/MM/YYYY HH:mm") : "";
  }

  public onBlur(event: Event) {
    if(this.blur) this.blur.emit(event); 
  }

}
