import { Component, ElementRef, EventEmitter, HostBinding, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { InputBase, LabelPosition } from '../input-base';

@Component({
  selector: 'input-button',
  templateUrl: './input-button.component.html',
  styleUrls: ['./input-button.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputButtonComponent extends InputBase implements OnInit {
  @HostBinding('class') class = 'form-group';
  @ViewChild('inputElement') inputElement?: ElementRef;
  @Output() buttonClick = new EventEmitter<Event>();
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
  @Input() numbers?: string; 
  @Input() textCase: string = "";
  @Input() iconButton: string = "bi-search";
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() maxLength?: number;
  @Input() required?: string;
  @Input() maskFormat?: string;
  @Input() set value(value: any) {
    this.formControl.setValue(value);
  }
  get value(): any {
    return this.formControl.value;
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

  public get isNumbers(): boolean {
    return this.numbers !== undefined;
  }


  ngOnInit(): void {
    super.ngOnInit();
  }

  public onButtonClick(event: Event) {
    if(this.buttonClick) this.buttonClick.emit(event);    
  }

  public onChange(event: Event) {
    if(this.change) this.change.emit(event); 
  }
}
