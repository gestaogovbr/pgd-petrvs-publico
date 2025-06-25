import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { InputBase, LabelPosition } from '../input-base';


export type InputTextCase = "upper" | "lower" | "";

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputTextComponent extends InputBase implements OnInit {
  @HostBinding('class') class = 'form-group';
  @ViewChild('inputElement') inputElement?: ElementRef;
  @Output() change = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<Event>();
  @Input() hostClass: string = ""; 
  @Input() labelPosition: LabelPosition = "top";
  @Input() controlName: string | null = null;
  @Input() disabled?: string;
  @Input() icon: string = "bi bi-textarea-t";
  @Input() label: string = "";
  @Input() labelInfo: string = "";
  @Input() labelClass?: string;
  @Input() bold: boolean = false;
  @Input() value: any = "";
  @Input() loading: boolean = false;
  @Input() numbers?: string;
  @Input() password?: string;
  @Input() textCase: InputTextCase = "";
  @Input() minValue?: any;
  @Input() maxValue?: any;
  @Input() stepValue?: any;
  @Input() prefix?: string;
  @Input() sufix?: string;
  @Input() form?: FormGroup;
  @Input() source?: any;
  @Input() path?: string;
  @Input() placeholder?: string;
  @Input() maxLength?: number = 250;
  @Input() maskFormat?: string;
  @Input() right?: string;
  @Input() maskDropSpecialCharacters: boolean = false; 
  @Input() required?: string;
  @Input() maskSpecialCharacters: string[] = ["-", "/", "(", ")", ".", ":", " ", "+", ",", "@", "[", "]", '"', "'"];
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

  public buffer?: string;

  constructor(public injector: Injector) {
    super(injector);
  }

  public get isNumbers(): boolean {
    return this.numbers !== undefined;
  }

  public get isRight(): boolean {
    return this.right !== undefined;
  }

  public get isPassword(): boolean {
    return this.password !== undefined;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public onChange(event: Event) {
    if(this.change) this.change.emit(event); 
  }

  public onBlur(event: Event) {
    if(this.blur) this.blur.emit(event); 
  }

  public onKeyUp(event: Event) {
    let inputValue = this.inputElement!.nativeElement.value;
    if(this.buffer != inputValue) {
      this.buffer = inputValue;
      if(this.change) this.change.emit(event); 
    }
  }

}
