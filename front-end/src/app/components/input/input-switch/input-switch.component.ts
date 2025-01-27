import { Component, ElementRef, EventEmitter, HostBinding, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { InputBase, InputScale, LabelPosition } from '../input-base';
 
@Component({
  selector: 'input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputSwitchComponent extends InputBase implements OnInit {
  @HostBinding('class') class = 'form-group';
  @ViewChild('checkbox') checkbox?: ElementRef;
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
  @Input() loading: boolean = false;
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() valueOn?: string;
  @Input() valueOff?: string;
  @Input() button?: string;
  @Input() buttonIcon?: string;
  @Input() buttonColor?: string;
  @Input() buttonCaption?: string;
  @Input() scale: InputScale = "medium";
  @Input() required?: string;
  @Input() set value(value: any) {
    this.setValue(value);
  }
  get value(): any {
    return this.getValue();
  }

  public setValue(value: any) {
    super.setValue(value);

    if(this.checkbox) this.checkbox.nativeElement.checked = this.valueOn ? this.valueOn == value : !!value;
  }

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

  constructor(public injector: Injector) {
    super(injector);
  }

  public get scaleClass(): string {
    return this.scale == "large" ? "switch-lg" : this.scale == "small" ? "switch-sm" : "switch-md"; 
  }

  public get containerClass(): string {
    return "form-check form-switch d-flex align-items-center" + (this.labelPosition == "left" ? " p-0 text-end justify-content-end me-2" : "");
  }

  public updateValue(value: any) {
    this.value = value;
    //console.log("UPDATEVALUE", this.controlName, this.valueOn, this.valueOff, value, this.control?.value);
    if(this.checkbox) this.checkbox.nativeElement.checked = this.valueOn ? this.valueOn == value : !!value; //this.value;
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if(this.control) {
      this.control.valueChanges.subscribe(this.updateValue.bind(this));
      this.value = this.control.value;
    }
    this.updateValue(this.value);
  }

  public get isButton(): boolean {
    return this.button != undefined;
  }

  public onChange(event: Event) {
    console.log('onChange');
    const value = (event.target as HTMLInputElement).checked ? this.valueOn || true : this.valueOff || false;
    //console.log("CHANGED", this.controlName, value);
    this.control?.setValue(value);
    this.updateValue(value);
    if(this.change) this.change.emit(event);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
